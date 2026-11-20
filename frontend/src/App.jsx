import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import { ToastProvider } from './contexts/ToastContext';
import { InfoProvider } from './contexts/InfoContext';
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_ID_CLIENT}>
      <ToastProvider>
        <InfoProvider>
          <RouterProvider router={router} />
        </InfoProvider>
      </ToastProvider>
    </GoogleOAuthProvider>
  );
}

export default App;