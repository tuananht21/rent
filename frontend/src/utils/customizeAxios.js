import axios from "axios";
import Cookies from 'js-cookie';
import { refreshTokenApi } from '../apis/clients/authApi'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Tự động gắn Access Token vào header
instance.interceptors.request.use(function (config) {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
);

// Response Interceptor: Xử lý response và tự động refresh token khi hết hạn
instance.interceptors.response.use((response) => response?.data ?? response, 
  async (error) => {
    const originalRequest = error.config;

    // Chỉ xử lý refresh khi: lỗi 401 + chưa retry + không phải chính API refresh
    if (error.response?.status === 401 &&!originalRequest?._retry &&!originalRequest?.url?.includes('auth/refreshtoken')) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        try {
          const res = await refreshTokenApi(refreshToken);

          if (res?.accessToken) {
            Cookies.set('accessToken', res.accessToken);
            originalRequest.headers['Authorization'] = 'Bearer ' + res.accessToken;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
        }
      }

      // Refresh thất bại hoặc không có refresh token → Đăng xuất
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Xử lý các lỗi khác
    if (error.response) {
      const message = error.response.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!';
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(new Error('Không có phản hồi từ server'));
    }

    return Promise.reject(new Error(error.message));
  }
);

export default instance;