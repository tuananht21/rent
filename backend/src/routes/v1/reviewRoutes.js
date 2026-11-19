import express from 'express';
import {
  createReviewController,
  updateReviewController,
  deleteReviewController,
  getReviewsByRoomController,
  getMyReviewsController,
} from '../../controllers/reviewController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const reviewRoutes = express.Router();

reviewRoutes.route('/').post(authMiddleware, createReviewController);

reviewRoutes.route('/my-reviews').get(authMiddleware, getMyReviewsController);

reviewRoutes.route('/room/:roomId').get(getReviewsByRoomController);

reviewRoutes
  .route('/:reviewId')
  .patch(authMiddleware, updateReviewController)
  .delete(authMiddleware, deleteReviewController);

export default reviewRoutes;
