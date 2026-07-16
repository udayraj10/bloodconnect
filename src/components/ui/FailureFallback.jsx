import { Box, Typography } from "@mui/material"

const FailureFallback = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="body1"
        component="h1"
        color="error"
        sx={{ textAlign: "center" }}
      >
        Something went wrong
      </Typography>
      <Typography
        variant="body2"
        component="h1"
        color="error"
        sx={{ textAlign: "center" }}
      >
        Please check your internet connection
      </Typography>
    </Box>
  )
}

export default FailureFallback
