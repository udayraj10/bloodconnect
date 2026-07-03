import Box from "@mui/material/Box"
import bloodDonation from "../../../assets/bloodDonation.webp"
import { display } from "@mui/system"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { useState } from "react"

const AuthScreen = () => {
  const [isRegister, setIsRegister] = useState(true)

  const updateRegister = (register) => {
    setIsRegister(register)
  }

  return (
    <Box
      sx={{
        height: "100vh",
        // overflow: "hidden",
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexGrow: 1,
        }}
      >
        {isRegister ? (
          <LoginForm updateRegister={updateRegister} />
        ) : (
          <RegisterForm updateRegister={updateRegister} />
        )}
      </Box>
    </Box>
  )
}

export default AuthScreen
