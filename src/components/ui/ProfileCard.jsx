import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Stack from "@mui/material/Stack"
import Chip from "./Chip"
import Typography from "@mui/material/Typography"
import { formatDate } from "../../utils/formatDate"
import { accountVariant } from "../../utils/chipUtils"

const ProfileCard = ({ user }) => {
  const isAvailable = user?.isAvailable || false

  const displayData = [
    { label: "Age", value: user?.age || "-" },
    { label: "Phone", value: user?.phone || "-" },
    { label: "Blood Group", value: user?.bloodGroup || "-" },
    { label: "City", value: user?.city || "-" },
    {
      label: "Account Type",
      value: user?.accountType || "-",
      component: "chip",
      variant: accountVariant(user?.accountType || "-"),
    },
    { label: "Member since", value: formatDate(user?.createdAt || "-") },
  ]

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardHeader
        title={user?.fullName || "Unknown User"}
        subheader={
          <Typography variant="body2" color="text.secondary">
            {user?.email || "No email available"}
          </Typography>
        }
        sx={{
          px: 2,
          pt: 2,
          pb: 2,
          backgroundColor: "transparent",
        }}
        action={
          <Box sx={{ m: 1.2 }}>
            <Chip variant={isAvailable ? "success" : "error"}>
              {isAvailable ? "Available" : "Not Available"}
            </Chip>
          </Box>
        }
      />

      <CardContent sx={{ px: 1, pt: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {displayData.map((item) => (
            <Box
              key={item.label}
              sx={{
                width: {
                  xs: "50%",
                  sm: "33.3%",
                  md: "16.6%",
                },
                px: 1,
                pt: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  fontWeight: 700,
                }}
              >
                {item.label}
              </Typography>
              {item.component === "chip" ? (
                <Box>
                  <Chip variant={item.variant}>{item.value}</Chip>
                </Box>
              ) : (
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  {item.value}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
