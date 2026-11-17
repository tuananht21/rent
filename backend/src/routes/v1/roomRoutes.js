import express from 'express';
import {
  getRoomController,
  createRoomController,
  updateRoomController,
  deleteRoomController,
} from '../../controllers/roomController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import {
  createRoomValidation,
  updateRoomValidation,
  searchRoomValidation,
} from '../../validations/roomValidation.js';

const roomRoutes = express.Router();

// ==========================================
// 1. ROOT ROUTES (/api/v1/rooms)
// ==========================================
roomRoutes.route('/')
  // Public: Lấy danh sách phòng, tìm kiếm và lọc
  .get(searchRoomValidation, getRoomController)
  // Private: Chủ trọ đăng tin phòng trọ mới (yêu cầu đăng nhập)
  .post(authMiddleware, createRoomValidation, createRoomController);

// ==========================================
// 2. DETAIL ROUTES (/api/v1/rooms/:id)
// ==========================================
roomRoutes.route('/:id')
  // Public: Xem chi tiết phòng trọ theo ID
  .get(getRoomController)
  // Private: Chủ trọ cập nhật thông tin phòng trọ (yêu cầu đăng nhập)
  .put(authMiddleware, updateRoomValidation, updateRoomController)
  // Private: Chủ trọ xóa mềm phòng trọ (yêu cầu đăng nhập)
  .delete(authMiddleware, deleteRoomController);

export default roomRoutes;