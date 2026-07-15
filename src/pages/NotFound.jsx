import React from "react"
import { Stack, Typography } from "@mui/material"

const NotFound = () => {
  return (
    <Stack sx={{ textAlign: "center" }}>
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </Stack>
  )
}

export default NotFound
