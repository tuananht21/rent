import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { decodedJWT, encodedJWT } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import redis from "../configs/redis.js";
import env from "../configs/environment.js";


const loginService = async (email, password) => {

  try {

    const isUser = await userModel.findOne({ email });
    if (!isUser) {
      throw new ApiError(400, 'Email or password not correct!');

    }

    const isPassword = await bcrypt.compare(password, isUser.password);

    if (!isPassword) {
      throw new ApiError(400, 'Email or password not correct!');
    }

    const accessToken = encodedJWT(isUser, 'access_token');
    const refreshToken = encodedJWT(isUser, 'refresh_token');

    // nếu redis lưu refresh token thì lưu TTL 7 ngày
    await redis.set(`refresh:${isUser._id}`, refreshToken, 'EX', env.REDIS_REFRESH_EXPIRES_IN);
    // Cập nhật trạng thái online và thời gian đăng nhập
    await userModel.updateOne({ _id: isUser._id }, { isOnline: true, lastLoginAt: new Date() });

    const res = {
      accessToken,
      refreshToken,
      user: {
        _id: isUser._id,
        userName: isUser.userName,
        email: isUser.email,
        role: isUser.role,
        plan: isUser.plan,
        avatar: isUser.avatar,
        isOnline: isUser.isOnline,
      }
    }

    return res;


  } catch (error) {
    throw new ApiError(400, error || 'Đã xảy ra lỗi trong quá trình đăng nhập!');
  }

};

const registerService = async (userName, email, password) => {

  try {
    const isUser = await userModel.findOne({ email });
    if (isUser) {
      throw new ApiError(400, 'Email đã tồn tại!');
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ userName, email, password: hashedPassword });
    const res = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    }
    return res;

  } catch (error) {
    throw new ApiError(400, error || 'Đã xảy ra lỗi trong quá trình đăng ký!');
  }

}

const logoutService = async (userId) => {

  try {

    const isUser = await userModel.findById(userId);

    if (!isUser) {
      throw new ApiError(400, 'User is not exist!');
    }

    // nếu lưu redis thì chỉ xóa thôi
    await redis.del(`refresh:${isUser._id}`);
    await userModel.updateOne({ _id: isUser._id }, { isOnline: false });

    return 'Logout successfully!';

  } catch (error) {
    throw new ApiError(400, error || 'Đã xảy ra lỗi trong quá trình đăng xuất!');
  }

}

const refreshTokenService = async (refreshToken) => {
  try {

    const decoded = decodedJWT(refreshToken, 'refresh_token');
    const userId = decoded.id;

    // nếu lưu redis thì lấy ra và so sánh với refresh token gửi lên 
    const storedToken = await redis.get(`refresh:${userId}`);
    if (!storedToken) throw new ApiError(401, 'Token không hợp lệ hoặc đã hết hạn');
    if (storedToken !== refreshToken) throw new ApiError(401, 'Token không khớp');

    const accessToken = encodedJWT(decoded, 'access_token');

    return accessToken;

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const decoded = jwt.decode(refreshToken);

      if (decoded?.id) {
        await redis.del(`refresh:${decoded.id}`);
      }
      throw new ApiError(400, 'Refresh token đã hết hạn');
    }
    throw new ApiError(400, error || 'Đã xảy ra lỗi trong quá trình!');
  }
}

const authUserService = async (id) => {

  try {

    const user = await userModel.findById(id).select('-password -refreshToken -__v -status -isDelete -createdAt -updatedAt');
    if (!user) {
      throw new ApiError(400, 'Người dùng không tồn tại');
    }
    return user;

  } catch (error) {
    throw new ApiError(400, error || 'Đã xảy ra lỗi trong quá trình xác thực!');
  }

}


export {
  loginService,
  registerService,
  logoutService,
  refreshTokenService,
  authUserService,
}
//