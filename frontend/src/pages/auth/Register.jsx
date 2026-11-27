import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { useFormik } from "formik";
import { registerApi } from "../../apis/clients/authApi";
import { registerValidation } from "../../validations/authValidation";
import MainContainer from '../../components/layouts/guest/MainContainer'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleShowToast } = useToast();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidation,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const { userName, email, password } = values;
        const res = await registerApi(userName, email, password);

        if (res.success) {
          navigate("/login");
          handleShowToast(res.message, "success");
          formik.resetForm();
        } else {
          handleShowToast(res.message, "error");
        }
      } catch (error) {
        console.error(error);
        handleShowToast(error.response?.data?.message || error.message, "error");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <MainContainer>
      <div className="relative flex min-h-screen items-center justify-center bg-center bg-no-repeat px-3 py-6 sm:px-6 sm:py-10"
        style={{ backgroundImage: "url('/images/map-loginpage.png')", backgroundSize: "cover" }} >
        <div className="absolute inset-0 bg-white/20"></div>
        <form onSubmit={formik.handleSubmit}
          className="relative z-0 w-full max-w-[360px] rounded-2xl border border-white/60 bg-white/95 p-5 shadow-xl sm:max-w-[380px] sm:p-6 md:max-w-[400px]">
          <div className="mb-5 text-center sm:mb-6">
            <h1 className="text-xl font-bold text-rent-text sm:text-2xl">Tạo tài khoản</h1>
            <p className="mt-2 text-xs leading-relaxed text-rent-text-secondary sm:text-sm">
              Đăng ký để trải nghiệm hệ thống Rent
            </p>
          </div>

          <div className="mt-3">
            <label htmlFor="userName" className="mb-2 block text-sm font-semibold text-rent-text">
              Họ và tên
            </label>
            <input id="userName" type="text" name="userName" placeholder="Nhập họ và tên"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName}
              className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 text-sm text-rent-text outline-none transition focus:border-rent-primary 
              focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3"/>
            {formik.errors.userName && formik.touched.userName && (
              <p className="mt-1 text-sm text-rent-error">{formik.errors.userName}</p>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-rent-text">
              Email
            </label>
            <input id="email" type="email" name="email" placeholder="mail@site.com"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
              className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 text-sm text-rent-text outline-none transition 
              focus:border-rent-primary focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3"/>
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 text-sm text-rent-error">{formik.errors.email}</p>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-rent-text">
              Mật khẩu
            </label>
            <input id="password" type="password" name="password" placeholder="Nhập mật khẩu"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
              className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 text-sm text-rent-text outline-none transition focus:border-rent-primary 
              focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3"/>
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-sm text-rent-error">{formik.errors.password}</p>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-rent-text">
              Xác nhận mật khẩu
            </label>
            <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword}
              className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 text-sm text-rent-text outline-none transition focus:border-rent-primary 
              focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3"/>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <p className="mt-1 text-sm text-rent-error">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" disabled={isLoading} className="mt-5 w-full rounded-lg bg-rent-primary py-2.5 text-sm font-semibold text-white transition 
            hover:bg-rent-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:py-3">
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <div className="mt-5 text-center text-xs text-rent-text-secondary sm:mt-6 sm:text-sm">
            Bạn đã có tài khoản?
            <Link to="/login" className="ml-1 font-semibold text-rent-primary hover:underline">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};

export default Register;