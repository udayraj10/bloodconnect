import { Navigate, Outlet } from "react-router-dom"
import { Box, CircularProgress } from "@mui/material"
import { useAuth } from "../../context/AuthContext"
import Progress from "../ui/Progress"

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth()

  if (loading && !isAuthenticated) return

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />
}

export default ProtectedRoute
