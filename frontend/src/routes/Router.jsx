
import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from '../components/layouts/guest/GuestLayout';
import Home from '../pages/Home'
import Logout from '../pages/Logout';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ProtectedRouter from './ProtectedRouter';
import GuestRouter from './GuestRouter';
import ProtectedLayout from '../components/layouts/protected/ProtectedLayout';
import Contact from '../pages/Contact';
const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        element: <GuestRouter />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ]
      },
      {
        path: '/logout',
        element: <Logout />,
      }
    ]
  },
  {
    element: <ProtectedRouter />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            
          }
        ]
      }
    ]
  }
]);

export default router;