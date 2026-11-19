import {
  createReviewService,
  updateReviewService,
  deleteReviewService,
  getReviewsByRoomService,
  getMyReviewsService,
} from '../services/reviewService.js';

const createReviewController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const review = await createReviewService(userId, req.body);

    return res.status(201).json({
      success: true,
      message: 'Tạo đánh giá thành công',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const updateReviewController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;

    const review = await updateReviewService(reviewId, userId, req.body);

    return res.status(200).json({
      success: true,
      message: 'Cập nhật đánh giá thành công',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReviewController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;

    const result = await deleteReviewService(reviewId, userId);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewsByRoomController = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const reviews = await getReviewsByRoomService(roomId);

    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách đánh giá thành công',
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

const getMyReviewsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const reviews = await getMyReviewsService(userId);

    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách đánh giá của bạn thành công',
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createReviewController,
  updateReviewController,
  deleteReviewController,
  getReviewsByRoomController,
  getMyReviewsController,
};
