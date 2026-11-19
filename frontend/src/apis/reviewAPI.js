import instance from "../utils/http";

const createReviewAPI = (roomId, rating, comment) => {
  const URL_API = "reviews";
  const data = {
    roomId,
    rating,
    comment,
  };

  return instance.post(URL_API, data);
};

const updateReviewAPI = (reviewId, rating, comment) => {
  const URL_API = `reviews/${reviewId}`;
  const data = {
    rating,
    comment,
  };

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