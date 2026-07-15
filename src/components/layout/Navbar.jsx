import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import PersonIcon from "@mui/icons-material/Person"
import ClearIcon from "@mui/icons-material/Clear"
import { useAuth } from "../../context/AuthContext"

export default function Navbar({ isMobileOpen, onMenuClick }) {
  const { user } = useAuth()

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          py: 0.5,
          minHeight: 75,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <WaterDropIcon
            sx={{
              color: "primary.main",
              fontSize: 34,
            }}
          />

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              Blood
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                }}
              >
                Connect
              </Box>
            </Typography>

            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary", lineHeight: 1 }}
            >
              Save Lives. Donate Blood.
            </Typography>
          </Box>
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Mobile Menu */}
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            {isMobileOpen ? <ClearIcon /> : <MenuIcon />}
          </IconButton>

          {/* User */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.light",
                color: "primary.main",
                width: 42,
                height: 42,
              }}
            >
              <PersonIcon />
            </Avatar>

            <Box>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ color: "text.primary" }}
              >
                {user?.fullName || "Username"}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "text.secondary",
                  lineHeight: 1,
                  fontWeight: 300,
                }}
              >
                {user?.role || "Role"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
