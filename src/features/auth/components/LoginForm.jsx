import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CardHeader from "@mui/material/CardHeader"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import AuthToggle from "./AuthToggle"
import { useForm } from "react-hook-form"
import FormTextField from "../../../components/ui/FormTextField"
import { useAuth } from "../../../context/AuthContext"
import { loginApi } from "../api/auth.api"

const LoginForm = ({ updateRegister }) => {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "gaurav.s@outlook.com",
      password: "000000",
    },
  })

  const onLogin = async (data) => {
    setLoading(true)
    try {
      setError("")

      const res = await loginApi(data)

      if (res.status === 200) {
        await login(res.data.token)

        reset()
        navigate("/", { replace: true })
      }
    } catch (error) {
      console.error("Login failed:", error)
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      component="form"
      onSubmit={handleSubmit(onLogin)}
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: "28rem",
        mx: 2,
      }}
    >
      <CardHeader
        title="Sign in"
        subheader="Enter your credentials to continue"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "& .MuiCardHeader-title": { fontSize: "1.2rem" },
          "& .MuiCardHeader-subheader": { fontSize: "0.8rem" },
        }}
      />
      <CardContent>
        <Stack spacing={2}>
          <FormTextField
            name="email"
            control={control}
            label="Email"
            rules={{ required: "Email is required" }}
            type="email"
            fullWidth
          />
          <FormTextField
            name="password"
            control={control}
            label="Password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            }}
            type="password"
            fullWidth
          />
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Button
          type="submit"
          loading={loading}
          loadingPosition="start"
          variant="contained"
          fullWidth
          sx={{ mb: 1 }}
        >
          Login
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </CardActions>

      <Divider sx={{ mx: 2 }} />

      <Typography
        variant="body2"
        sx={{
          m: 2,
          textAlign: "center",
        }}
      >
        Don't have an account?
        <AuthToggle
          authName="Register"
          updateRegister={updateRegister}
          updateStatus={false}
        />
      </Typography>
    </Card>
  )
}

export default LoginForm
