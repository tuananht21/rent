import express from 'express';
import {
  createBookingController,
  getMyBookingsController,
  getOwnerBookingsController,
  getBookingDetailController,
  confirmBookingController,
  rejectBookingController,
  cancelBookingController,
  completeBookingController,
} from '../../controllers/bookingController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { createBookingValidation } from '../../validations/bookingValidation.js';

const bookingRoutes = express.Router();

bookingRoutes.route('/')
  .post(authMiddleware, createBookingValidation, createBookingController);

bookingRoutes.route('/my-bookings')
  .get(authMiddleware, getMyBookingsController);

bookingRoutes.route('/owner-bookings')
  .get(authMiddleware, getOwnerBookingsController);

bookingRoutes.route('/:id')
  .get(authMiddleware, getBookingDetailController);

bookingRoutes.route('/:id/confirm')
  .patch(authMiddleware, confirmBookingController);

bookingRoutes.route('/:id/reject')
  .patch(authMiddleware, rejectBookingController);

bookingRoutes.route('/:id/cancel')
  .patch(authMiddleware, cancelBookingController);

bookingRoutes.route('/:id/complete')
  .patch(authMiddleware, completeBookingController);

export default bookingRoutes;
