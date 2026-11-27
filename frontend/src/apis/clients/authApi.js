import instance from "../../utils/customizeAxios";

const registerApi = (userName = "", email = "", password = "") => {
  const URL_API = "auth/register";
  const data = {
    userName,
    email,
    password,
  };

  return instance.post(URL_API, data);
};

const loginApi = (email = "", password = "") => {
  const URL_API = "auth/login";
  const data = {
    email,
    password,
  };

  return instance.post(URL_API, data);
};

const authUserAPI = () => {
  const URL_API = "auth/me";

  return instance.get(URL_API);
};

const logoutApi = () => {
  const URL_API = "auth/logout";

  return instance.post(URL_API);
};

const refreshTokenApi = (refreshToken = "") => {
  const URL_API = "auth/refreshtoken";
  const data = {
    refreshtoken: refreshToken,
  };

  return instance.post(URL_API, data);
};

export {
  registerApi,
  loginApi,
  authUserAPI,
  logoutApi,
  refreshTokenApi,
};
