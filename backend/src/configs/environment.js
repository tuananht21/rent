import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT,
  MONGOOSE_URL: process.env.MONGOOSE_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  BUILD_MODE: process.env.BUILD_MODE,
}

export default env;
// 