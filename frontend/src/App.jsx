
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import { ThemeProvider } from './contexts/ThemeContext'
import { ToastProvider } from './contexts/ToastContext'
import { InfoProvider } from './contexts/InfoContext'

function App() {

  return (
    <ThemeProvider>
      <ToastProvider>
        <InfoProvider>
          <RouterProvider router={router} />
        </InfoProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App