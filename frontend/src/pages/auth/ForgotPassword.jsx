import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { forgotPasswordAPI } from "../../apis/auth";
import { forgotPasswordValidation } from "../../validations/authValidation";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleShowToast } = useToast();

  const handleSendEmailForgotPassword = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    try {
      await forgotPasswordValidation.validate({ email }, { abortEarly: true });
      setIsLoading(true);
      const res = await forgotPasswordAPI(email);
      handleShowToast(res.message, res.success ? "success" : "error");
    } catch (error) {
      console.log(error);
      handleShowToast(error.response?.data?.message || error.message || "Đã xảy ra lỗi", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-3 py-6 sm:px-6 sm:py-10" style={{ backgroundImage: "url('/images/map-loginpage.png')" }}>
      <div className="absolute inset-0 bg-white/20"></div>
      <form onSubmit={handleSendEmailForgotPassword} className="relative z-0 w-full max-w-[360px] rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:max-w-[380px] sm:p-6 md:max-w-[400px]">
        <div className="mb-6 text-center sm:mb-7">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rent-primary-light text-rent-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-rent-text sm:text-2xl">Quên mật khẩu?</h1>
          <p className="mt-2 text-xs leading-relaxed text-rent-text-secondary sm:text-sm">Đừng lo lắng! Hãy nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.</p>
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-rent-text">Email</label>
          <input id="email" type="email" name="email" required autoComplete="email" placeholder="mail@site.com" disabled={isLoading} className="w-full rounded-lg border border-rent-border bg-white px-3 py-2.5 text-sm text-rent-text outline-none transition placeholder:text-gray-400 focus:border-rent-primary focus:ring-2 focus:ring-rent-primary/10 sm:px-4 sm:py-3" />
        </div>
        <button type="submit" disabled={isLoading} className="mt-4 w-full rounded-lg bg-rent-primary py-2.5 text-sm font-semibold text-white transition hover:bg-rent-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:mt-5 sm:py-3">
          {isLoading ? "Đang gửi..." : "Gửi yêu cầu khôi phục"}
        </button>
        <div className="mt-5 border-t border-rent-border pt-5 text-center text-xs text-rent-text-secondary sm:mt-6 sm:text-sm">
          Bạn đã có tài khoản?
          <Link to="/login" className="ml-1 font-semibold text-rent-primary hover:underline">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;