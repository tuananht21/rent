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

const getFavoriteService = async () => {};

const deleteFavoriteService = async () => {};

const checkFavoriteService = async () => {};

export {
  createFavoriteService,
  getFavoriteService,
  deleteFavoriteService,
  checkFavoriteService,
};