import User from '../models/usersModel.js';
import ApiError from '../utils/ApiError.js';

const setUserOnlineService = async (userId = '') => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, 'User không tồn tại!');
    const updateUserOnline = await User.updateOne({ _id: userId }, { $set: { isOnline: true } });
    return updateUserOnline;
  } catch (error) {
    throw new ApiError(400, error || 'Đã xảy ra lỗi!');
  }
};

const setUserOfflineService = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, 'User không tồn tại!');
    const updateUserOffline = await User.updateOne({ _id: userId }, { $set: { isOnline: false } });
    return updateUserOffline;
  } catch (error) {
    throw new ApiError(400, error || 'Đã xảy ra lỗi!');
  }
};

const updateProfileService = async (userId = '') => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, 'User không tồn tại!');
    if (user.role !== 'host' && user.role !== 'renter') throw new ApiError(403, 'Bạn không có quyền cập nhật thông tin!');
    const updatedUser = await User.updateOne({ _id: userId }, { $set: updateData });
    return updatedUser;
  } catch (error) {
    throw new ApiError(400, error || 'Đã xảy ra lỗi!');
  }
};

export {
  setUserOnlineService,
  setUserOfflineService,
  updateProfileService,
};
