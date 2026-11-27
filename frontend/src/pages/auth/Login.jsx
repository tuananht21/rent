import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useInfo } from "../../hooks/useInfo";
import { loginApi } from "../../apis/clients/authApi";
import { loginValidation } from "../../validations/authValidation";
import MainContainer from "../../components/layouts/guest/MainContainer";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const { handleShowToast } = useToast();
  const { setInfo } = useInfo();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { email, password } = values;
        const res = await loginApi(email, password);

        if (res.success) {
          const data = res.data;

          Cookies.set("accessToken", data.accessToken);
          Cookies.set("refreshToken", data.refreshToken);
          Cookies.set("user", JSON.stringify({
            name: data.user.userName,
            email: data.user.email,
            avatar: data.user.avatar,
          }));

          setInfo(data.user);
          if (res.data.user.role) {
            navigation('/');
          }
          handleShowToast(res.message, "success");
          formik.resetForm();
        } else {
          handleShowToast(res.message, "error");
        }
      } catch (error) {
        console.error(error);
        handleShowToast(error.response?.data?.message || error.message,"error");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <MainContainer>
      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center 
        bg-no-repeat px-3 py-6 sm:px-6 sm:py-10" style={{ backgroundImage: "url('/images/map-loginpage.png')" }}>
        <div className="absolute inset-0 bg-white/20"></div>
        <form onSubmit={formik.handleSubmit} className="relative z-0 w-full max-w-[360px] rounded-2xl border border-white/70 
          bg-white/90 p-5 shadow-xl backdrop-blur-md sm:max-w-[380px] sm:p-6 md:max-w-[400px]">
          <div className="mb-6 text-center sm:mb-7">
            <h1 className="text-xl font-bold text-rent-text sm:text-2xl">Chào mừng trở lại!</h1>
            <p className="mt-2 text-xs leading-relaxed text-rent-text-secondary sm:text-sm">Đăng nhập để tiếp tục sử dụng hệ thống Rent</p>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-rent-text">Email</label>
            <input id="email" type="email" name="email" placeholder="mail@site.com" onChange={formik.handleChange}
              onBlur={formik.handleBlur} value={formik.values.email} className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 text-sm 
              text-rent-text outline-none transition focus:border-rent-primary focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3"/>
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 text-sm text-rent-error">{formik.errors.email}</p>
            )}
          </div>
          <div className="mt-4 sm:mt-5">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold text-rent-text">Mật khẩu</label>
              <Link to="#" className="text-xs font-medium text-rent-primary hover:underline sm:text-sm">
                Quên mật khẩu?
              </Link>
            </div>
            <input id="password" type="password" name="password" placeholder="Nhập mật khẩu" onChange={formik.handleChange}
              onBlur={formik.handleBlur} value={formik.values.password} className="w-full rounded-lg border border-rent-border 
              bg-white px-3 py-2.5 text-sm text-rent-text outline-none transition focus:border-rent-primary focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3"/>
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-sm text-rent-error">{formik.errors.password}</p>
            )}
          </div>
          <button type="submit" disabled={isLoading} className="mt-4 w-full rounded-lg bg-rent-primary py-2.5 text-sm font-semibold 
          text-white transition hover:bg-rent-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:mt-5 sm:py-3">
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <div className="mt-5 text-center text-xs text-rent-text-secondary sm:mt-6 sm:text-sm">
            Bạn chưa có tài khoản?
            <Link to="/register" className="ml-1 font-semibold text-rent-primary hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};

export default Login;