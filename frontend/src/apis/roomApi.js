import instance from '../utils/http';

const getAllRooms = (params = {}) => {
  const URL_API = 'rooms';
  return instance.get(URL_API, { params });
};

const getRoomById = (id) => {
  const URL_API = `rooms/${id}`;
  return instance.get(URL_API);
};

const createRoom = (data) => {
  const URL_API = 'rooms';
  return instance.post(URL_API, data);
};

const updateRoom = (id, data) => {
  const URL_API = `rooms/${id}`;
  return instance.put(URL_API, data);
};

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
