import instance from '../utils/http';

const getFavorites = () => {
  const URL_API = 'favorites';
  return instance.get(URL_API);
};

const createFavorite = (roomId) => {
  const URL_API = 'favorites';
  const data = {
    roomId,
  };

  return instance.post(URL_API, data);
};

const deleteFavorite = (roomId) => {
  const URL_API = `favorites/${roomId}`;
  return instance.delete(URL_API);
};

const checkFavorite = (roomId) => {
  const URL_API = `favorites/${roomId}/check`;
  return instance.get(URL_API);
};

export {
  getFavorites,
  createFavorite,
  deleteFavorite,
  checkFavorite,
};
