import {
  createFavoriteService,
  getFavoriteService,
  deleteFavoriteService,
  checkFavoriteService,
} from '../services/favoriteService.js';

const createFavoriteController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { roomId } = req.body;

    const favorite = await createFavoriteService(userId, roomId);

    res.status(201).json({
      success: true,
      message: 'Thêm phòng trọ vào danh sách yêu thích thành công',
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

const getFavoriteController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const favorites = await getFavoriteService(userId);

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách yêu thích thành công',
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFavoriteController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { roomId } = req.params;

    await deleteFavoriteService(userId, roomId);

    res.status(200).json({
      success: true,
      message: 'Xóa phòng trọ khỏi danh sách yêu thích thành công',
    });
  } catch (error) {
    next(error);
  }
};

const checkFavoriteController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { roomId } = req.params;

    const isFavorite = await checkFavoriteService(userId, roomId);

    res.status(200).json({
      success: true,
      message: 'Kiểm tra trạng thái yêu thích thành công',
      data: { isFavorite },
    });
  } catch (error) {
    next(error);
  }
};

export { createFavoriteController, getFavoriteController, deleteFavoriteController, checkFavoriteController };
