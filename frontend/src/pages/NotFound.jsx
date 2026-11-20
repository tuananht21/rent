import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mt-2 flex flex-col items-center">
      <h1 className="font-semibold text-rent-text">404 - Not Found</h1>
      <p className="mt-1 text-sm text-rent-text-secondary">Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/" className="mt-3 rounded-md bg-rent-primary px-3 py-1.5 text-sm text-rent-white transition-colors hover:bg-rent-primary-hover">
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;