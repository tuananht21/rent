import Room from '../models/roomModel.js';
import Category from '../models/categoriesModel.js';
import ApiError from '../utils/ApiError.js';
import redis from '../config/redis.js';

// Helper: Xóa cache liên quan đến phòng
const clearRoomCache = async (id = null) => {
  try {
    if (id) await redis.del(`rooms:detail:${id}`);
    const keys = await redis.keys('rooms:search:*');
    if (keys.length > 0) await redis.del(...keys);
  } catch (error) {
    console.error('Redis del error:', error.message);
  }
};

// Helper: Tìm phòng theo ID (chưa bị xóa mềm) + kiểm tra quyền sở hữu
const findRoomAndCheckOwner = async (id, ownerId) => {
  let room;
  try {
    room = await Room.findOne({ _id: id, deletedAt: null });
  } catch (error) {
    if (error.name === 'CastError') throw new ApiError(400, 'ID phòng trọ không hợp lệ');
    throw new ApiError(500, 'Lỗi khi tìm phòng trọ');
  }

  if (!room) throw new ApiError(404, 'Phòng trọ không tồn tại hoặc đã bị xóa');

  if (room.ownerId.toString() !== ownerId.toString()) {
    throw new ApiError(403, 'Bạn không có quyền thao tác phòng trọ này');
  }

  return room;
};

// Helper: Kiểm tra danh mục có tồn tại và đang active
const validateCategory = async (categoryId) => {
  let category;
  try {
    category = await Category.findOne({ _id: categoryId, status: 'active' });
  } catch (error) {
    if (error.name === 'CastError') throw new ApiError(400, 'ID danh mục không hợp lệ');
    throw new ApiError(500, 'Lỗi khi kiểm tra danh mục');
  }

  if (!category) throw new ApiError(404, 'Danh mục không tồn tại hoặc đã bị vô hiệu hóa');
  return category;
};

// Lấy chi tiết phòng hoặc danh sách phòng (tìm kiếm, lọc, phân trang)
const getRoomService = async (id = null, query = {}) => {
  if (typeof id === 'object' && id !== null) {
    query = id;
    id = null;
  }

  // XEM CHI TIẾT PHÒNG THEO ID
  if (id) {
    const cacheKey = `rooms:detail:${id}`;

    try {
      const cached = await redis.get(cacheKey);
      if (cached) return JSON.parse(cached);
    } catch (error) {
      console.error('Redis get error:', error.message);
    }

    let room;
    try {
      room = await Room.findOne({ _id: id, deletedAt: null })
        .populate('ownerId', 'userName email phone avatar')
        .populate('categoryId', 'name')
        .lean();
    } catch (error) {
      if (error.name === 'CastError') throw new ApiError(400, 'Invalid room ID');
      throw new ApiError(500, 'Failed to retrieve room detail');
    }

    if (!room) throw new ApiError(404, 'Room not found');

    try {
      await redis.set(cacheKey, JSON.stringify(room), 'EX', 1800);
    } catch (error) {
      console.error('Redis set error:', error.message);
    }

    return room;
  }

  // TÌM KIẾM, LỌC VÀ PHÂN TRANG DANH SÁCH PHÒNG
  const { keyword, categoryId, minPrice, maxPrice, minArea, maxArea, page = 1, limit = 10, sort = 'newest' } = query;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));
  const skip = (pageNum - 1) * limitNum;

  const filter = { deletedAt: null, status: 'available' };

  if (categoryId) filter.categoryId = categoryId;

  if (keyword && keyword.trim() !== '') {
    const regex = new RegExp(keyword.trim(), 'i');
    filter.$or = [{ title: regex }, { address: regex }];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined && minPrice !== '') filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined && maxPrice !== '') filter.price.$lte = Number(maxPrice);
  }

  if (minArea !== undefined || maxArea !== undefined) {
    filter.area = {};
    if (minArea !== undefined && minArea !== '') filter.area.$gte = Number(minArea);
    if (maxArea !== undefined && maxArea !== '') filter.area.$lte = Number(maxArea);
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'price_asc') sortOption = { price: 1 };
  else if (sort === 'price_desc') sortOption = { price: -1 };

  const cacheKey = `rooms:search:${JSON.stringify({ filter, pageNum, limitNum, sortOption })}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (error) {
    console.error('Redis get error:', error.message);
  }

  let totalRooms, rooms;
  try {
    [totalRooms, rooms] = await Promise.all([
      Room.countDocuments(filter),
      Room.find(filter)
        .populate('ownerId', 'userName email phone avatar')
        .populate('categoryId', 'name')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
    ]);
  } catch (error) {
    throw new ApiError(500, 'Failed to retrieve rooms');
  }

  const result = {
    rooms,
    pagination: {
      currentPage: pageNum,
      limit: limitNum,
      totalRooms,
      totalPages: Math.ceil(totalRooms / limitNum) || 1,
    },
  };

  try {
    await redis.set(cacheKey, JSON.stringify(result), 'EX', 300);
  } catch (error) {
    console.error('Redis set error:', error.message);
  }

  return result;
};

// Chủ trọ đăng tin phòng mới
const createRoomService = async (ownerId, data) => {
  const { categoryId, title, description, price, area, address, images, amenities } = data;

  await validateCategory(categoryId);

  let newRoom;
  try {
    newRoom = await Room.create({
      ownerId,
      categoryId,
      title,
      description,
      price,
      area,
      address,
      images: images || [],
      amenities: amenities || [],
    });
  } catch (error) {
    if (error.name === 'ValidationError') throw new ApiError(400, error.message);
    throw new ApiError(500, 'Không thể tạo phòng trọ mới');
  }

  await clearRoomCache();
  return newRoom;
};

// Chủ trọ chỉnh sửa thông tin phòng
const updateRoomService = async (id, ownerId, data) => {
  const room = await findRoomAndCheckOwner(id, ownerId);

  if (data.categoryId && data.categoryId !== room.categoryId.toString()) {
    await validateCategory(data.categoryId);
  }

  Object.assign(room, data);

  try {
    await room.save();
  } catch (error) {
    if (error.name === 'ValidationError') throw new ApiError(400, error.message);
    throw new ApiError(500, 'Lỗi khi cập nhật phòng trọ');
  }

  await clearRoomCache(id);
  return room;
};

// Xóa mềm phòng trọ
const deleteRoomService = async (id, ownerId) => {
  const room = await findRoomAndCheckOwner(id, ownerId);

  room.deletedAt = new Date();
  room.status = 'hidden';

  try {
    await room.save();
  } catch (error) {
    throw new ApiError(500, 'Lỗi khi xóa phòng trọ');
  }

  await clearRoomCache(id);
  return { message: 'Xóa phòng trọ thành công' };
};

export { getRoomService, createRoomService, updateRoomService, deleteRoomService };