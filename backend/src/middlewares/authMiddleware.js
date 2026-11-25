import ApiError from "../utils/ApiError.js";
import userModel from "../models/userModel.js";
import { decodedJWT } from "../utils/jwt.js";
import redis from "../configs/redis.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Không tìm thấy token.");
    }

    const decoded = decodedJWT(token, "access_token");

    const storedToken = await redis.exists(`refresh:${decoded.id}`);

    if (!storedToken) {
      throw new ApiError(401, "Người dùng không hợp lệ hoặc đã đăng xuất.");
    }

    req.user = decoded;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token đã hết hạn."));
    }

    return next(error);
  }
};

export default authMiddleware;
