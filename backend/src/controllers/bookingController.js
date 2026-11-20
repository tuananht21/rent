import {
  createBookingService,
  getMyBookingsService,
  getOwnerBookingsService,
  getBookingDetailService,
  confirmBookingService,
  rejectBookingService,
  cancelBookingService,
  completeBookingService,
} from '../services/bookingService.js';
import ApiError from '../utils/ApiError.js';

const createBookingController = async (req, res, next) => {
  try {
    const booking = await createBookingService(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: 'Đặt lịch xem phòng thành công',
      data: booking,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const getMyBookingsController = async (req, res, next) => {
  try {
    const bookings = await getMyBookingsService(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách lịch đã đặt thành công',
      data: bookings,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const getOwnerBookingsController = async (req, res, next) => {
  try {
    const bookings = await getOwnerBookingsService(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách yêu cầu xem phòng thành công',
      data: bookings,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const getBookingDetailController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingDetailService(id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Lấy chi tiết lịch hẹn thành công',
      data: booking,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const confirmBookingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await confirmBookingService(id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Xác nhận lịch hẹn thành công',
      data: booking,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const rejectBookingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await rejectBookingService(id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Từ chối lịch hẹn thành công',
      data: booking,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const cancelBookingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await cancelBookingService(id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Hủy lịch hẹn thành công',
      data: booking,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const completeBookingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await completeBookingService(id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Xác nhận hoàn thành xem phòng thành công',
      data: booking,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

export {
  createBookingController,
  getMyBookingsController,
  getOwnerBookingsController,
  getBookingDetailController,
  confirmBookingController,
  rejectBookingController,
  cancelBookingController,
  completeBookingController,
};
