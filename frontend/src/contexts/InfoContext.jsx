import { createContext, useEffect, useState } from 'react';
import { authUserAPI } from '../apis/clients/authApi';
import Loading from '../components/common/Loading';
import Cookies from 'js-cookie';

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clearSession = () => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('user');
      setInfo({});
    };

    const handleGetInfo = async () => {
      try {
        const res = await authUserAPI();
        if (res.success) {
          setInfo(res.data);
        } else {
          clearSession();      
          window.location.href = '/login';
          return;
        }
      } catch (error) {
        console.log(error);
        // Xóa token lỗi/không hợp lệ (400, 500...) để tránh F5 gọi lại mãi
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      handleGetInfo();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>;
};

export { InfoContext, InfoProvider };