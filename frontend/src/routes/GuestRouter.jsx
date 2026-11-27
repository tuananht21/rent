import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useInfo } from '../hooks/useInfo'

const GuestRouter = () => {
  const { info } = useInfo()
  const navigate = useNavigate()

  useEffect(() => {
    if (info?._id) {
      navigate('/')
    }
  }, [info?._id, navigate])

  return <Outlet />
}

export default GuestRouter