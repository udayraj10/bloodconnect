import Box from "@mui/material/Box"
import UpdateProfile from "../components/UpdateProfile"
import { Typography } from "@mui/material"
import ProfileCard from "../../../components/ui/ProfileCard"
import Divider from "@mui/material/Divider"
import ChangePassword from "../components/ChangePassword"
import { useAuth } from "../../../context/AuthContext"

const ProfileScreen = () => {
  const { user } = useAuth()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: { xs: 0.5, sm: 1 },
        mb: 4,
      }}
    >
      <ProfileCard user={user} />
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
  )
}

export default ProfileScreen
