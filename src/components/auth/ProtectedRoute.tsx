import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
} 