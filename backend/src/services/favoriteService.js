import Favorite from '../models/favoriteModel.js';
import Room from '../models/roomModel.js';
import ApiError from '../utils/ApiError.js';
import redis from '../config/redis.js';

const createFavoriteService = async (userId, roomId) => {
  try {
    const room = await Room.findOne({ _id: roomId, deletedAt: null });

    if (!room) {
      throw new ApiError(404, 'Phòng trọ không tồn tại hoặc đã bị xóa');
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error.name === 'CastError') {
      throw new ApiError(400, 'ID phòng trọ không hợp lệ');
    }

    throw new ApiError(500, 'Lỗi khi kiểm tra phòng trọ');
  }

  const existingFavorite = await Favorite.findOne({ userId, roomId });

  if (existingFavorite) {
    throw new ApiError(409, 'Phòng trọ này đã có trong danh sách yêu thích');
  }

  let favorite;

  try {
    favorite = await Favorite.create({ userId, roomId });
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, 'Phòng trọ này đã có trong danh sách yêu thích');
    }

    throw new ApiError(500, 'Không thể thêm vào danh sách yêu thích');
  }

  try {
    const keys = await redis.keys(`favorites:${userId}:*`);

    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Redis del error:', error.message);
  }

  return favorite;
};

const getFavoriteService = async (userId) => {
  const cacheKey = `favorites:${userId}:list`;

  try {
    const cachedFavorites = await redis.get(cacheKey);

    if (cachedFavorites) {
      return JSON.parse(cachedFavorites);
    }
  } catch (error) {
    console.error('Redis get error:', error.message);
  }

  let favorites;

  try {
    favorites = await Favorite.find({ userId }).populate({ path: 'roomId', match: { deletedAt: null } }).sort({ createdAt: -1 }).lean();

    favorites = favorites.filter((favorite) => favorite.roomId);
  } catch (error) {
    throw new ApiError(500, 'Không thể lấy danh sách yêu thích');
  }

  try {
    await redis.set(cacheKey, JSON.stringify(favorites), 'EX', 300);
  } catch (error) {
    console.error('Redis set error:', error.message);
  }

  return favorites;
};

const deleteFavoriteService = async (userId, roomId) => {
  let favorite;

  try {
    favorite = await Favorite.findOneAndDelete({ userId, roomId });
  } catch (error) {
    if (error.name === 'CastError') {
      throw new ApiError(400, 'ID phòng trọ không hợp lệ');
    }

    throw new ApiError(500, 'Không thể xóa phòng trọ khỏi danh sách yêu thích');
  }

  if (!favorite) {
    throw new ApiError(404, 'Phòng trọ không có trong danh sách yêu thích');
  }

  try {
    const keys = await redis.keys(`favorites:${userId}:*`);

    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Redis del error:', error.message);
  }

  return favorite;
};

const checkFavoriteService = async (userId, roomId) => {
  try {
    const favorite = await Favorite.exists({ userId, roomId });

    return !!favorite;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new ApiError(400, 'ID phòng trọ không hợp lệ');
    }

    throw new ApiError(500, 'Không thể kiểm tra trạng thái yêu thích');
  }
};

export { createFavoriteService, getFavoriteService, deleteFavoriteService, checkFavoriteService };
