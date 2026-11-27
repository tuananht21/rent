import ApiError from "../utils/ApiError.js";
import { decodedJWT } from "../utils/jwt.js";


const guestMiddleware = (req, res, next) => {

  try {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = decodedJWT(token, 'access_token');
      if (decoded) {
        return next(new ApiError(403, 'Bạn đã đăng nhập rồi.'));
      }
    }

    // Nếu không có token → cho đi tiếp
    return next();

  } catch {
    // Nếu token không hợp lệ → vẫn cho đi tiếp vì là guest
    return next();
  }

}

export default guestMiddleware;