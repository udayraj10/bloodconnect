import { useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import bloodDonation from "../../../assets/bloodDonation.webp"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

const AuthScreen = () => {
  const [isRegister, setIsRegister] = useState(true)

  const updateRegister = (register) => {
    setIsRegister(register)
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        component="img"
        src={bloodDonation}
        alt="blood donation image"
        sx={{
          maxWidth: "50%",
          height: "100%",
          objectFit: "cover",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      />

      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexGrow: 1,
        }}
      >
        <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
          *Response may take a moment. Please wait and retry.
        </Typography>
        {isRegister ? (
          <LoginForm updateRegister={updateRegister} />
        ) : (
          <RegisterForm updateRegister={updateRegister} />
        )}
      </Stack>
    </Box>
  )
}

export default AuthScreen
