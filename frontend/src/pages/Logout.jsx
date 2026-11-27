import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { logoutApi } from '../apis/clients/authApi'
import { useInfo } from '../hooks/useInfo'
import { useToast } from '../hooks/useToast'

const Logout = () => {
  const navigate = useNavigate()
  const { setInfo } = useInfo()
  const { handleShowToast } = useToast()
  const hasLoggedOutRef = useRef(false)

  useEffect(() => {
    if (hasLoggedOutRef.current) return
    hasLoggedOutRef.current = true

    const handleLogout = async () => {
      try {
        const res = await logoutApi()
        handleShowToast(res?.message || 'Đăng xuất thành công', 'success')
      } catch (error) {
        handleShowToast(error.response?.data?.message || error.message || 'Đăng xuất thất bại', 'error')
      } finally {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('user')
        setInfo({})
        navigate('/login')
      }
    }

    handleLogout()
  }, [navigate, handleShowToast, setInfo])

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  )
}

export default Logout