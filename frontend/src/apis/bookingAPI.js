import instance from "../utils/http";

const createBookingAPI = (data) => {
  const URL_API = "bookings";
  return instance.post(URL_API, data);
};

const getMyBookingsAPI = () => {
  const URL_API = "bookings/my-bookings";
  return instance.get(URL_API);
};

const getOwnerBookingsAPI = () => {
  const URL_API = "bookings/owner-bookings";
  return instance.get(URL_API);
};

const getBookingDetailAPI = (id) => {
  const URL_API = `bookings/${id}`;
  return instance.get(URL_API);
};

const confirmBookingAPI = (id) => {
  const URL_API = `bookings/${id}/confirm`;
  return instance.patch(URL_API);
};

const rejectBookingAPI = (id) => {
  const URL_API = `bookings/${id}/reject`;
  return instance.patch(URL_API);
};

const cancelBookingAPI = (id) => {
  const URL_API = `bookings/${id}/cancel`;
  return instance.patch(URL_API);
};

const completeBookingAPI = (id) => {
  const URL_API = `bookings/${id}/complete`;
  return instance.patch(URL_API);
};

export {
  createBookingAPI,
  getMyBookingsAPI,
  getOwnerBookingsAPI,
  getBookingDetailAPI,
  confirmBookingAPI,
  rejectBookingAPI,
  cancelBookingAPI,
  completeBookingAPI,
};