import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import Forbidden from '../pages/Forbidden';
import NotFound from '../pages/NotFound';
import Login from '../pages/auth/Login';
import Register from "../pages/auth/Register";
import ForgotPassword from '../pages/auth/ForgotPassword';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />
          },
          {
            path: '/forgot-password',
            element: <ForgotPassword />
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      
    ],
  },
  {
    path: '/forbidden',
    element: <Forbidden />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;