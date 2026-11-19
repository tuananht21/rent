import instance from "../utils/http";

const createReviewAPI = (data) => {
  const URL_API = "reviews";
  return instance.post(URL_API, data);
};

const updateReviewAPI = (reviewId, data) => {
  const URL_API = `reviews/${reviewId}`;
  return instance.patch(URL_API, data);
};

const deleteReviewAPI = (reviewId) => {
  const URL_API = `reviews/${reviewId}`;
  return instance.delete(URL_API);
};

const getReviewsByRoomAPI = (roomId) => {
  const URL_API = `reviews/room/${roomId}`;
  return instance.get(URL_API);
};

const getMyReviewsAPI = () => {
  const URL_API = "reviews/my-reviews";
  return instance.get(URL_API);
};

export {
  createReviewAPI,
  updateReviewAPI,
  deleteReviewAPI,
  getReviewsByRoomAPI,
  getMyReviewsAPI,
};
