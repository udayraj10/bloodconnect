import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth()

  if (loading && !isAuthenticated) return

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />
}

export default ProtectedRoute
