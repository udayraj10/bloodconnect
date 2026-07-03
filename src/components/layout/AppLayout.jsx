import Box from "@mui/material/Box"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useState } from "react"
import { Typography } from "@mui/material"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  const [isMobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!isMobileOpen)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar isMobileOpen={isMobileOpen} onMenuClick={handleDrawerToggle} />
      <Sidebar isMobileOpen={isMobileOpen} onToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 8, sm: 7 } }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppLayout
