import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useInfo } from '../hooks/useInfo'
import Forbidden from '../pages/Forbidden'

const ProtectedRouter = ({ allowedRoles = [] }) => {
  const { info } = useInfo()
  const navigate = useNavigate()

  useEffect(() => {
    if (!info?._id) {
      navigate('/login')
    }
  }, [info?._id, navigate])

  if (info?._id && allowedRoles.length > 0 && !allowedRoles.includes(info.role)) {
    return <Forbidden />
  }

  return <Outlet />
}

export default ProtectedRouter