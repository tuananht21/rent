import Review from '../models/reviewModel.js';
import Room from '../models/roomModel.js';
import ApiError from '../utils/ApiError.js';

const createReviewService = async (userId, data) => {
  const { roomId, rating, comment } = data;

  const room = await Room.findOne({ _id: roomId, deletedAt: null });
  if (!room) throw new ApiError(404, 'Phòng trọ không tồn tại hoặc đã bị xóa');
  if (room.ownerId.toString() === userId.toString()) {
    throw new ApiError(400, 'Bạn không thể tự đánh giá phòng trọ của chính mình');
  }

  const existingReview = await Review.findOne({ userId, roomId });
  if (existingReview) throw new ApiError(409, 'Bạn đã đánh giá phòng trọ này rồi');

  return await Review.create({
    userId,
    roomId,
    rating,
    comment: comment?.trim() || null,
  });
};

const updateReviewService = async (reviewId, userId, data) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new ApiError(404, 'Đánh giá không tồn tại');
  if (review.userId.toString() !== userId.toString()) {
    throw new ApiError(403, 'Bạn không có quyền chỉnh sửa đánh giá này');
  }

  if (data.rating !== undefined) review.rating = data.rating;
  if (data.comment !== undefined) review.comment = data.comment?.trim() || null;

  return await review.save();
};

const deleteReviewService = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new ApiError(404, 'Đánh giá không tồn tại');
  if (review.userId.toString() !== userId.toString()) {
    throw new ApiError(403, 'Bạn không có quyền xóa đánh giá này');
  }

  await review.deleteOne();
  return { message: 'Xóa đánh giá thành công' };
};

const getReviewsByRoomService = async (roomId) => {
  const room = await Room.findOne({ _id: roomId, deletedAt: null });
  if (!room) throw new ApiError(404, 'Phòng trọ không tồn tại hoặc đã bị xóa');

  return await Review.find({ roomId }).populate('userId', 'userName avatar').sort({ createdAt: -1 }).lean();
};

const getMyReviewsService = async (userId) => {
  return await Review.find({ userId }).populate('roomId').sort({ createdAt: -1 }).lean();
};

export { createReviewService, updateReviewService, deleteReviewService, getReviewsByRoomService, getMyReviewsService };