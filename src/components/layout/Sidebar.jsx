import { Link, useLocation } from "react-router-dom"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"
import ListItemIcon from "@mui/material/ListItemIcon"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useAuth } from "../../context/AuthContext"
import {
  AccountCircle,
  VolunteerActivism,
  Redeem,
  ManageSearch,
  BarChart,
  Logout,
} from "../../utils/icons"

const drawerWidth = 240

const menuItems = [
  { text: "Dashboard", icon: <BarChart />, path: "/" },
  { text: "Profile", icon: <AccountCircle />, path: "/profile" },
  { text: "Requests", icon: <VolunteerActivism />, path: "/requests" },
  { text: "Offers", icon: <Redeem />, path: "/offers" },
  { text: "Search", icon: <ManageSearch />, path: "/search" },
]

const Sidebar = ({ isMobileOpen, onToggle }) => {
  const { logout } = useAuth()
  const location = useLocation()

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

  const currentPath = location.pathname

  const handleItemClick = () => {
    if (!isDesktop) {
      onToggle()
    }
  }

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
          pt: 7.9,
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
                  onClick={handleItemClick}
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
                          fontWeight: isSelected ? 600 : 400,
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
              startIcon={<Logout />}
              fullWidth
              sx={{ borderWidth: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar
