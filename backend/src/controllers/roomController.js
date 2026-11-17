import {
  getRoomService,
  createRoomService,
  updateRoomService,
  deleteRoomService,
} from '../services/roomService.js';
import ApiError from '../utils/ApiError.js';

const getRoomController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = id ? await getRoomService(id) : await getRoomService(null, req.query);

    res.status(200).json({
      success: true,
      message: id ? 'Lấy chi tiết phòng trọ thành công' : 'Lấy danh sách phòng trọ thành công',
      data,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const createRoomController = async (req, res, next) => {
  try {
    const room = await createRoomService(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: 'Đăng tin phòng trọ thành công',
      data: room,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const updateRoomController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await updateRoomService(id, req.user.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin phòng trọ thành công',
      data: room,
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

const deleteRoomController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteRoomService(id, req.user.id);

    res.status(200).json({
      success: true,
      message: result.message || 'Xóa phòng trọ thành công',
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || error));
  }
};

export {
  getRoomController,
  createRoomController,
  updateRoomController,
  deleteRoomController,
};