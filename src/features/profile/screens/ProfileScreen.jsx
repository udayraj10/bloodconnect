import Box from "@mui/material/Box"
import UpdateProfile from "../components/UpdateProfile"
import { Typography } from "@mui/material"
import ProfileCard from "../components/ProfileCard"
import Divider from "@mui/material/Divider"
import ChangePassword from "../components/ChangePassword"
import Footer from "../../../components/ui/Footer"

const ProfileScreen = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" component="h1">
        Profile
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Manage your account details
      </Typography>
      <Box sx={{ mb: 4 }}>
        <ProfileCard />
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <UpdateProfile />
          <ChangePassword />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default ProfileScreen
