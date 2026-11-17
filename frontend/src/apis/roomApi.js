import instance from '../utils/http';

// Lấy danh sách phòng (hỗ trợ tìm kiếm, lọc, phân trang)
const getAllRooms = (params = {}) => {
  const URL_API = 'rooms';
  return instance.get(URL_API, { params });
};

// Lấy chi tiết phòng
const getRoomById = (id) => {
  const URL_API = `rooms/${id}`;
  return instance.get(URL_API);
};

// Tạo phòng
const createRoom = (data) => {
  const URL_API = 'rooms';
  return instance.post(URL_API, data);
};

// Cập nhật phòng
const updateRoom = (id, data) => {
  const URL_API = `rooms/${id}`;
  return instance.put(URL_API, data);
};

// Xóa phòng
const deleteRoom = (id) => {
  const URL_API = `rooms/${id}`;
  return instance.delete(URL_API);
};

export {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
