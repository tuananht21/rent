import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { useFormik } from "formik";
import { registerAPI } from "../../apis/auth";
import { registerValidation } from "../../validations/authValidation";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        const res = await registerAPI(userName, email, password);
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
    <div className="relative flex min-h-screen items-center justify-center bg-center bg-no-repeat px-3 py-6 sm:px-6 sm:py-10" style={{ backgroundImage: "url('/images/map-loginpage.png')", backgroundSize: "cover" }}>
      <div className="absolute inset-0 bg-white/20"></div>
      <form onSubmit={formik.handleSubmit} className="relative z-0 w-full max-w-[360px] rounded-2xl border border-white/60 bg-white/95 p-5 shadow-xl sm:max-w-[380px] sm:p-6 md:max-w-[400px]">
        <div className="mb-5 text-center sm:mb-6">
          <h1 className="text-xl font-bold text-rent-text sm:text-2xl">Tạo tài khoản</h1>
          <p className="mt-2 text-xs leading-relaxed text-rent-text-secondary sm:text-sm">Đăng ký để trải nghiệm hệ thống Rent</p>
        </div>
        <div className="mt-3">
          <label htmlFor="userName" className="mb-2 block text-sm font-semibold text-rent-text">Họ và tên</label>
          <input id="userName" type="text" name="userName" placeholder="Nhập họ và tên" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 text-sm text-rent-text outline-none transition focus:border-rent-primary focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3" />
          {formik.errors.userName && formik.touched.userName && <p className="mt-1 text-sm text-rent-error">{formik.errors.userName}</p>}
        </div>
        <div className="mt-3">
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-rent-text">Email</label>
          <input id="email" type="email" name="email" placeholder="mail@site.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 text-sm text-rent-text outline-none transition focus:border-rent-primary focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3" />
          {formik.errors.email && formik.touched.email && <p className="mt-1 text-sm text-rent-error">{formik.errors.email}</p>}
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-rent-text">Mật khẩu</label>
          <div className="relative">
            <input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="Nhập mật khẩu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 pr-12 text-sm text-rent-text outline-none transition focus:border-rent-primary focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-rent-muted hover:text-rent-primary" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                  <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.5 9 7-.3 1.1-1.1 2.5-2.3 3.7" />
                  <path d="M6.2 6.2C3.9 7.5 2.5 9.8 2 12c.7 2.5 4 7 10 7 1.1 0 2.1-.2 3-.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {formik.errors.password && formik.touched.password && <p className="mt-1 text-sm text-rent-error">{formik.errors.password}</p>}
        </div>
        <div className="mt-3">
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-rent-text">Xác nhận mật khẩu</label>
          <div className="relative">
            <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Nhập lại mật khẩu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 pr-12 text-sm text-rent-text outline-none transition focus:border-rent-primary focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-rent-muted hover:text-rent-primary" aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                  <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.5 9 7-.3 1.1-1.1 2.5-2.3 3.7" />
                  <path d="M6.2 6.2C3.9 7.5 2.5 9.8 2 12c.7 2.5 4 7 10 7 1.1 0 2.1-.2 3-.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && <p className="mt-1 text-sm text-rent-error">{formik.errors.confirmPassword}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="mt-5 w-full rounded-lg bg-rent-primary py-2.5 text-sm font-semibold text-white transition hover:bg-rent-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:py-3">
          {isLoading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
        <div className="mt-5 text-center text-xs text-rent-text-secondary sm:mt-6 sm:text-sm">
          Bạn đã có tài khoản?
          <Link to="/login" className="ml-1 font-semibold text-rent-primary hover:underline">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;