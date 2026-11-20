import jwt from 'jsonwebtoken';
import env from '../config/environment.js';

const decodedJWT = (token, type = 'access_token') => {
  try {
    if (type === 'access_token') {
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
      return decoded;
    } else if (type === 'refresh_token') {
      const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
      return decoded;
    } else if (type === 'invite_token') {
      const decoded = jwt.verify(token, env.JWT_INVITE_SECRET);
      return decoded;
    } else if (type === 'forgot_password') {
      const decoded = jwt.verify(token, env.JWT_FORGOT_SECRET);
      return decoded;
    }
  } catch (error) {
    throw error;
  }
};

const encodedJWT = (user = {}, type = 'access_token') => {
  try {
    if (type === 'access_token') {
      const token = jwt.sign(
        {
          id: user.id || user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        },
        env.JWT_ACCESS_SECRET,
        {
          expiresIn: env.JWT_ACCESS_EXPIRES_IN,
        }
      );
      return token;
    }
    if (type === 'refresh_token') {
      const token = jwt.sign(
        {
          id: user.id || user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        },
        env.JWT_REFRESH_SECRET,
        {
          expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        }
      );
      return token;
    }
    if (type === 'invite_token') {
      const token = jwt.sign(
        {
          id: user.id || user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
          ...user,
        },
        env.JWT_INVITE_SECRET,
        {
          expiresIn: env.JWT_INVITE_EXPIRES_IN,
        }
      );
      return token;
    } else if (type === 'forgot_password') {
      const token = jwt.sign(
        {
          userId: user.userId,
          email: user.email,
          password: user.password,
        },
        env.JWT_FORGOT_SECRET,
        {
          expiresIn: env.JWT_FORGOT_EXPIRES_IN,
        }
      );
      return token;
    }
  } catch (error) {
    throw error;
  }
};

export { decodedJWT, encodedJWT };