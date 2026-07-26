import { Box, Typography } from "@mui/material"

const FailureFallback = ({
  message = "Something went wrong, Please try again later.",
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body1" component="h1" sx={{ textAlign: "center" }}>
        {message}
      </Typography>
    </Box>
  )
}

export default FailureFallback
