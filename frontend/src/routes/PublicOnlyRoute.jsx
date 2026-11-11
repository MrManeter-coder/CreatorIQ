
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import FullPageLoader from '../components/common/FullPageLoader'
import { useAuth } from '../hooks/useAuth'
import { getHomePath, ROLES } from '../utils/constants'

export default function PublicOnlyRoute() {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <FullPageLoader />

  if (user) {
    const previousPath = location.state?.from?.pathname
    const target =
      user.role === ROLES.CREATOR && previousPath
        ? previousPath
        : getHomePath(user.role)

    return <Navigate to={target} replace />
  }

  return <Outlet />
}
