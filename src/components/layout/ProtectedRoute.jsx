import { Navigate, Outlet } from "react-router-dom"
import { Box, CircularProgress } from "@mui/material"
import { useAuth } from "../../context/AuthContext"

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />
}

export default ProtectedRoute
