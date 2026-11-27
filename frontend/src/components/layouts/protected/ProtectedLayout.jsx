
import { Outlet } from 'react-router-dom'
import ProtectedHeader from './ProtectedHeader';

const ProtectedLayout = () => {
  return (
    <>
      <div>
        <ProtectedHeader />
      </div>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
