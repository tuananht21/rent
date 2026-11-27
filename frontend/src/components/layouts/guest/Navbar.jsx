import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useInfo } from '../../../hooks/useInfo';

const Navbar = () => {
  const { info } = useInfo();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = Object.keys(info).length > 0;
  const isLandlord = info?.role === 'landlord';
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="relative w-full border-b border-rent-border bg-rent-surface">
      <div className="mx-auto flex h-14 w-full items-center justify-between px-4 lg:h-[68px] lg:px-6">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setIsOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg border border-rent-border text-rent-text 
            transition hover:bg-rent-background lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img src="images/favicon.png" alt="RentHouse Logo" className="size-9 object-contain lg:size-10"/>
            <span className="text-xl font-extrabold text-rent-primary lg:text-2xl">RENT</span>
          </Link>
        </div>
        <div className="hidden items-center gap-6 lg:flex">
          <Link to="/" className="text-sm font-medium text-rent-text transition hover:text-rent-primary">Trang chủ</Link>
          <Link to="/contact" className="text-sm font-medium text-rent-text transition hover:text-rent-primary">Liên hệ</Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="flex items-center gap-2 rounded-lg bg-rent-primary px-3 py-2 
                text-sm font-semibold text-rent-white transition hover:bg-rent-primary-hover">
                Đăng nhập
              </Link>
              <Link to="/register" className="flex items-center gap-2 rounded-lg border border-rent-border px-3 py-2 text-sm 
                font-semibold text-rent-text-secondary transition hover:bg-rent-background">
                Đăng ký
              </Link>
            </>
          ) : (
            isLandlord && (
              <Link to="/landlord/rooms/create" className="flex items-center gap-2 rounded-lg bg-rent-primary px-4 py-2 
                text-sm font-semibold text-rent-white transition hover:bg-rent-primary-hover">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Đăng tin
              </Link>
            )
          )}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={closeMenu} />
          <div className="absolute inset-y-0 left-0 flex w-[75%] max-w-[300px] flex-col bg-rent-surface">
            <div className="flex h-14 items-center justify-between border-b border-rent-border px-4">
              <div className="flex items-center gap-2">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" onClick={closeMenu} className="flex items-center gap-1.5 rounded-full bg-rent-primary 
                      px-3 py-2 text-xs font-semibold text-rent-white transition hover:bg-rent-primary-hover">Đăng nhập</Link>
                    <Link to="/register" onClick={closeMenu} className="flex items-center gap-1.5 rounded-full bg-rent-background 
                      px-3 py-2 text-xs font-semibold text-rent-text">Đăng ký</Link>
                  </>
                ) : (
                  <span className="font-semibold text-rent-text">Tài khoản của tôi</span>
                )}
              </div>
              <button type="button" onClick={closeMenu} className="flex size-8 items-center justify-center rounded-full text-rent-text-secondary 
                transition hover:bg-rent-background">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {isLandlord && (
              <Link to="/landlord/rooms/create" onClick={closeMenu}
                className="flex h-12 items-center justify-between bg-rent-primary px-4 text-sm font-bold text-rent-white">
                Dành cho chủ trọ
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10M7 17L17 7" />
                </svg>
              </Link>
            )}
            <div className="flex flex-col py-2">
              <Link to="/rooms" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-rent-text transition hover:bg-rent-primary-light hover:text-rent-primary">Phòng trọ</Link>
              <Link to="/houses" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-rent-text transition hover:bg-rent-primary-light hover:text-rent-primary">Nhà riêng</Link>
              <Link to="/apartments" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-rent-text transition hover:bg-rent-primary-light hover:text-rent-primary">Căn hộ</Link>
              <Link to="/contact" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-rent-text transition hover:bg-rent-primary-light hover:text-rent-primary">Liên hệ</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar