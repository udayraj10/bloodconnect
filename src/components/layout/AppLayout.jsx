import Box from "@mui/material/Box"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useState } from "react"
import { Stack, Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const AppLayout = () => {
  const [isMobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!isMobileOpen)
  }

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Navbar isMobileOpen={isMobileOpen} onMenuClick={handleDrawerToggle} />
      <Stack direction="row" sx={{ flexGrow: 1 }}>
        <Sidebar isMobileOpen={isMobileOpen} onToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: { xs: 8, sm: 7 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>

          <Footer />
        </Box>
      </Stack>
    </Stack>
  )
}

export default AppLayout
