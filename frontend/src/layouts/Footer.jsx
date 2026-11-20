
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-rent-border bg-rent-surface">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:gap-12 lg:px-6 lg:py-12">
        <div className="flex flex-col">
          <Link to="/" className="mb-5 flex w-fit items-center gap-2">
            <img src="/images/favicon.png" alt="RentHouse Logo" className="size-10 object-contain"/>
            <span className="text-2xl font-extrabold text-rent-primary">
              RENT
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-7 text-rent-text-secondary">
            RENT - Nền tảng kết nối người thuê và chủ trọ,
            giúp bạn dễ dàng tìm kiếm không gian sống phù hợp,
            tiết kiệm thời gian và chi phí.
          </p>
          <h3 className="mb-4 mt-7 text-base font-bold text-rent-primary">
            TẠI SAO CHỌN RENT?
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rent-primary-light text-rent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-rent-text">
                  Tìm kiếm dễ dàng
                </p>
                <p className="text-xs text-rent-text-secondary">
                  Bộ lọc đa dạng, nhanh chóng tìm phòng phù hợp
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rent-primary-light text-rent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-rent-text">
                  Thông tin minh bạch
                </p>
                <p className="text-xs text-rent-text-secondary">
                  Thông tin phòng trọ rõ ràng, đáng tin cậy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rent-primary-light text-rent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="10" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-rent-text">
                  Kết nối thuận tiện
                </p>
                <p className="text-xs text-rent-text-secondary">
                  Kết nối trực tiếp giữa người thuê và chủ trọ
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
          <div>
            <h3 className="mb-4 text-lg font-bold text-rent-primary">
              HỆ THỐNG
            </h3>
            <div className="flex flex-col gap-3 text-sm text-rent-text">
              <Link to="/blog" className="transition hover:text-rent-primary">
                Blog
              </Link>
              <Link to="#" className="transition hover:text-rent-primary">
                Hướng dẫn
              </Link>
              <Link to="/contact" className="transition hover:text-rent-primary">
                Liên hệ
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-rent-primary">
              DÀNH CHO CHỦ TRỌ
            </h3>
            <div className="flex flex-col gap-3 text-sm text-rent-text">
              <Link to="#" className="transition hover:text-rent-primary">
                Giới thiệu dành cho chủ trọ
              </Link>
              <Link to="/landlord/rooms/create" className="transition hover:text-rent-primary">
                Đăng tin cho thuê
              </Link>
              <Link to="#" className="transition hover:text-rent-primary">
                Quản lý phòng trọ
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-rent-primary">
              THÔNG TIN
            </h3>
            <div className="flex flex-col gap-3 text-sm text-rent-text">
              <Link to="#" className="transition hover:text-rent-primary">
                Điều khoản sử dụng
              </Link>
              <Link to="#" className="transition hover:text-rent-primary">
                Chính sách bảo mật
              </Link>
              <Link to="#" className="transition hover:text-rent-primary">
                Quy chế hoạt động
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-lg font-bold text-rent-primary">
            KẾT NỐI VỚI CHÚNG TÔI
          </h3>

          <div className="flex flex-col gap-4 text-sm text-rent-text">
            <a href="tel:0332661579"
              className="flex items-center gap-3 transition hover:text-rent-primary">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rent-primary-light text-rent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 5a2 2 0 0 1 2-2h3.3a1 1 0 0 1 1 .8l1.1 4.4a1 1 0 0 1-.5 1.1l-2.2 1.3a11 11 0 0 0 5.7 5.7l1.3-2.2a1 1 0 0 1 1.1-.5l4.4 1.1a1 1 0 0 1 .8 1V19a2 2 0 0 1-2 2h-1C9.6 21 3 14.4 3 6V5z" />
                </svg>
              </span>
              033.266.1579
            </a>

            <a href="#"
              className="flex items-center gap-3 transition hover:text-rent-primary">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rent-primary-light font-bold text-rent-primary">
                Zalo
              </span>
              0332661579
            </a>
            <a href="mailto:contact@renthouse.com"
              className="flex items-center gap-3 transition hover:text-rent-primary">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rent-primary-light text-rent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7l9 6 9-6M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
                </svg>
              </span>
              contact@renthouse.com
            </a>

            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rent-primary-light text-rent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span className="pt-2">
                Địa chỉ: Việt Nam
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a href="#" rel="noreferrer" className="rounded-full bg-rent-primary-light px-3 py-1.5 text-xs font-medium text-rent-primary transition hover:bg-rent-primary hover:text-white">
              Facebook
            </a>
            <a href="#" rel="noreferrer" className="rounded-full bg-rent-primary-light px-3 py-1.5 text-xs font-medium text-rent-primary transition hover:bg-rent-primary hover:text-white">
              TikTok
            </a>
            <a href="#" rel="noreferrer" className="rounded-full bg-rent-primary-light px-3 py-1.5 text-xs font-medium text-rent-primary transition hover:bg-rent-primary hover:text-white">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="flex min-h-9 items-center justify-center bg-rent-primary px-4 py-2 text-center text-xs font-medium text-white">
        Copyright © 2026 RentHouse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;