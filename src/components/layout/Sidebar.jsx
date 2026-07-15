import { Link, useLocation } from "react-router-dom"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"
import HomeIcon from "@mui/icons-material/Home"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"
import RedeemIcon from "@mui/icons-material/Redeem"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import BarChartIcon from "@mui/icons-material/BarChart"
import ListItemIcon from "@mui/material/ListItemIcon"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useAuth } from "../../context/AuthContext"

const drawerWidth = 240

const menuItems = [
  { text: "Dashboard", icon: <HomeIcon />, path: "/" },
  { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  { text: "Requests", icon: <VolunteerActivismIcon />, path: "/requests" },
  { text: "Offers", icon: <RedeemIcon />, path: "/offers" },
  { text: "Search", icon: <WaterDropIcon />, path: "/search" },
  { text: "My Stats", icon: <BarChartIcon />, path: "/stats" },
]

const Sidebar = ({ isMobileOpen, onToggle }) => {
  const { logout } = useAuth()
  const location = useLocation()

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

  const currentPath = location.pathname

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={isDesktop ? true : isMobileOpen}
      onClose={onToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          pt: { xs: 6, sm: 7 },
        }}
      >
        <List>
          {menuItems.map((item) => {
            const isSelected =
              item.path === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.path)

            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={isSelected}
                  sx={{
                    color: "text.primary",

                    "&:hover": {
                      bgcolor: "primary.light",
                    },

                    "&.Mui-selected": {
                      bgcolor: "primary.light",
                      color: "primary.main",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: isSelected ? 500 : 300,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Box
          sx={{
            mt: "auto",
            mb: 2,
          }}
        >
          <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />
          <Box sx={{ px: 2 }}>
            <Button
              onClick={logout}
              variant="outlined"
              fullWidth
              sx={{ borderWidth: 2 }}
            >
              Log out
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar
