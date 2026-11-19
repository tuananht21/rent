import Booking from '../models/bookingModel.js';
import Room from '../models/roomModel.js';
import ApiError from '../utils/ApiError.js';

const createBookingService = async (userId, data) => {
  const { roomId, bookingDate, note } = data;

  const room = await Room.findOne({ _id: roomId, deletedAt: null });
  if (!room) throw new ApiError(404, 'Phòng trọ không tồn tại hoặc đã bị xóa');
  if (room.status !== 'available') throw new ApiError(400, 'Phòng trọ hiện không còn trống để đặt lịch xem');
  if (room.ownerId.toString() === userId.toString()) throw new ApiError(400, 'Bạn không thể tự đặt lịch xem phòng của chính mình');

  const appointmentDate = new Date(bookingDate);
  if (isNaN(appointmentDate.getTime()) || appointmentDate <= new Date()) {
    throw new ApiError(400, 'Thời gian xem phòng phải nằm trong tương lai');
  }

  const existingBooking = await Booking.findOne({ userId, roomId, status: 'pending' });
  if (existingBooking) throw new ApiError(409, 'Bạn đã có một yêu cầu xem phòng đang chờ chủ trọ duyệt');

  return await Booking.create({
    userId,
    roomId,
    bookingDate: appointmentDate,
    note: note?.trim() || null,
    status: 'pending',
  });
};

const getMyBookingsService = async (userId) => {
  return await Booking.find({ userId }).populate({
      path: 'roomId',
      select: 'title price address images status ownerId',
      populate: { path: 'ownerId', select: 'userName phone avatar' },
    }).sort({ createdAt: -1 }).lean();
};

const getOwnerBookingsService = async (ownerId) => {
  const roomIds = await Room.find({ ownerId, deletedAt: null }).distinct('_id');

  return await Booking.find({ roomId: { $in: roomIds } })
    .populate('roomId', 'title price address images status')
    .populate('userId', 'userName email phone avatar')
    .sort({ createdAt: -1 }).lean();
};

const getBookingDetailService = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId)
    .populate({
      path: 'roomId',
      select: 'title price address images status ownerId',
      populate: { path: 'ownerId', select: 'userName email phone avatar' },
    })
    .populate('userId', 'userName email phone avatar')
    .lean();

  if (!booking) throw new ApiError(404, 'Lịch hẹn không tồn tại');

  const isTenant = (booking.userId._id || booking.userId).toString() === userId.toString();
  const isOwner = (booking.roomId?.ownerId?._id || booking.roomId?.ownerId)?.toString() === userId.toString();

  if (!isTenant && !isOwner) {
    throw new ApiError(403, 'Bạn không có quyền xem chi tiết lịch hẹn này');
  }

  return booking;
};

const confirmBookingService = async (bookingId, ownerId) => {
  const booking = await Booking.findById(bookingId).populate('roomId', 'ownerId');
  if (!booking) throw new ApiError(404, 'Lịch hẹn không tồn tại');

  if (booking.roomId?.ownerId?.toString() !== ownerId.toString()) {
    throw new ApiError(403, 'Bạn không có quyền xác nhận lịch hẹn này');
  }

  if (booking.status !== 'pending') {
    throw new ApiError(400, 'Chỉ có thể xác nhận lịch hẹn đang ở trạng thái chờ duyệt');
  }

  booking.status = 'confirmed';
  return await booking.save();
};

const rejectBookingService = async (bookingId, ownerId) => {
  const booking = await Booking.findById(bookingId).populate('roomId', 'ownerId');
  if (!booking) throw new ApiError(404, 'Lịch hẹn không tồn tại');

  if (booking.roomId?.ownerId?.toString() !== ownerId.toString()) {
    throw new ApiError(403, 'Bạn không có quyền từ chối lịch hẹn này');
  }

  if (booking.status !== 'pending') {
    throw new ApiError(400, 'Chỉ có thể từ chối lịch hẹn đang ở trạng thái chờ duyệt');
  }

  booking.status = 'rejected';
  return await booking.save();
};

const cancelBookingService = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId).populate('roomId', 'ownerId');
  if (!booking) throw new ApiError(404, 'Lịch hẹn không tồn tại');

  const isTenant = booking.userId.toString() === userId.toString();
  const isOwner = booking.roomId?.ownerId?.toString() === userId.toString();

  if (!isTenant && !isOwner) {
    throw new ApiError(403, 'Bạn không có quyền hủy lịch hẹn này');
  }

  if (!['pending', 'confirmed'].includes(booking.status)) {
    throw new ApiError(400, 'Chỉ có thể hủy lịch hẹn đang ở trạng thái chờ duyệt hoặc đã xác nhận');
  }

  booking.status = 'cancelled';
  return await booking.save();
};

const completeBookingService = async (bookingId, ownerId) => {
  const booking = await Booking.findById(bookingId).populate('roomId', 'ownerId');
  if (!booking) throw new ApiError(404, 'Lịch hẹn không tồn tại');

  if (booking.roomId?.ownerId?.toString() !== ownerId.toString()) {
    throw new ApiError(403, 'Bạn không có quyền hoàn thành lịch hẹn này');
  }

  if (booking.status !== 'confirmed') {
    throw new ApiError(400, 'Chỉ có thể hoàn thành lịch hẹn đang ở trạng thái đã xác nhận');
  }

  booking.status = 'completed';
  return await booking.save();
};

export {
  createBookingService,
  getMyBookingsService,
  getOwnerBookingsService,
  getBookingDetailService,
  confirmBookingService,
  rejectBookingService,
  cancelBookingService,
  completeBookingService,
};