import instance from "../utils/http";

const registerAPI = (userName, email, password) => {
  const URL_API = "auth/register";
  const data = {
    userName,
    email,
    password,
  };

  return instance.post(URL_API, data);
};

const loginAPI = (email, password) => {
  const URL_API = "auth/login";
  const data = {
    email,
    password,
  };

  return instance.post(URL_API, data);
};

const logoutAPI = () => {
  const URL_API = "auth/logout";
  return instance.post(URL_API);
};

const refreshTokenAPI = (refreshToken) => {
  const URL_API = "auth/refresh-token";
  const data = {
    refreshToken,
  };

  return instance.post(URL_API, data);
};

const authUserAPI = () => {
  const URL_API = "auth/me";
  return instance.get(URL_API);
};

const oAuthGoogleAPI = (token = "") => {
  const URL_API = `auth/google`;
  const data = {
    token,
  };
  return instance.post(URL_API, data);
};

const changePasswordAPI = (oldPassword, newPassword) => {
  const URL_API = "auth/change-password";
  const data = {
    oldPassword,
    newPassword,
  };

  return instance.post(URL_API, data);
};

const forgotPasswordAPI = (email) => {
  const URL_API = "auth/forgot-password";
  const data = {
    email,
  };

  return instance.post(URL_API, data);
};

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
  oAuthGoogleAPI,
  changePasswordAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
};
