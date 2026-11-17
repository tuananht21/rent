import instance from "../utils/http";

// Đăng ký tài khoản
const registerAPI = (userName, email, password) => {
  const URL_API = "auth/register";
  const data = {
    userName,
    email,
    password,
  };

  return instance.post(URL_API, data);
};

// Đăng nhập
const loginAPI = (email, password) => {
  const URL_API = "auth/login";
  const data = {
    email,
    password,
  };

  return instance.post(URL_API, data);
};

// Đăng xuất
const logoutAPI = () => {
  const URL_API = "auth/logout";
  return instance.post(URL_API);
};

// Làm mới Access Token
const refreshTokenAPI = (refreshToken) => {
  const URL_API = "auth/refresh-token";
  const data = {
    refreshToken,
  };

  return instance.post(URL_API, data);
};

// Lấy thông tin người dùng hiện tại
const authUserAPI = () => {
  const URL_API = "auth/me";
  return instance.get(URL_API);
};

// Đổi mật khẩu
const changePasswordAPI = (oldPassword, newPassword) => {
  const URL_API = "auth/change-password";
  const data = {
    oldPassword,
    newPassword,
  };

  return instance.post(URL_API, data);
};

// Quên mật khẩu
const forgotPasswordAPI = (email) => {
  const URL_API = "auth/forgot-password";
  const data = {
    email,
  };

  return instance.post(URL_API, data);
};

// Đặt lại mật khẩu
const resetPasswordAPI = (token, password) => {
  const URL_API = "auth/reset-password";
  const data = {
    token,
    password,
  };

  return instance.post(URL_API, data);
};

export {
  registerAPI,
  loginAPI,
  logoutAPI,
  refreshTokenAPI,
  authUserAPI,
  changePasswordAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
};
