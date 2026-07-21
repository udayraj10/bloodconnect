import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CardHeader from "@mui/material/CardHeader"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import AuthToggle from "./AuthToggle"
import FormTextField from "../../../components/ui/FormTextField"
import FormAutocomplete from "../../../components/ui/FormAutocomplete"
import FormCheckbox from "../../../components/ui/FormCheckbox"
import { registerApi } from "../api/auth.api"
import { useAuth } from "../../../context/AuthContext"
import { bloodGroupOptions, accountTypeOptions } from "../../../utils/options"

const RegisterForm = ({ updateRegister }) => {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      age: "",
      phone: "",
      bloodGroup: "",
      city: "",
      address: "",
      accountType: "",
      isAvailable: false,
    },
  })

  const onRegister = async (data) => {
    setLoading(true)
    try {
      setError("")

      const res = await registerApi(data)

      if (res.status === 201) {
        await login(res.data.token)

        reset()
        navigate("/", { replace: true })
      }
    } catch (error) {
      console.error("Registration failed:", error)
      const rawMsg = error.response?.data?.message

      const errorMessage =
        typeof rawMsg === "string"
          ? rawMsg
          : rawMsg
            ? Object.values(rawMsg).join(", ")
            : "Registration failed. Please try again."

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      component="form"
      onSubmit={handleSubmit(onRegister)}
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: "28rem",
        mx: 2,
        overflow: "auto",
      }}
      s
    >
      <CardHeader
        title="Create Account"
        subheader="Join the platform and start saving lives"
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
            name="fullName"
            control={control}
            label="Full Name"
            rules={{ required: "Full name is required" }}
            fullWidth
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <FormAutocomplete
              name="bloodGroup"
              control={control}
              label="Blood Group"
              options={bloodGroupOptions}
              rules={{ required: "Blood group is required" }}
              fullWidth
            />

            <FormTextField
              name="age"
              control={control}
              label="Age"
              rules={{ required: "Age is required" }}
              type="number"
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <FormTextField
              name="city"
              control={control}
              label="City"
              rules={{ required: "City is required" }}
              fullWidth
            />

            <FormTextField
              name="address"
              control={control}
              label="Address"
              rules={{
                required: "Address is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              }}
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <FormTextField
              name="phone"
              control={control}
              label="Phone"
              rules={{
                required: "Phone is required",
                minLength: { value: 10, message: "Minimum 10 digits" },
              }}
              type="number"
              fullWidth
            />

            <FormAutocomplete
              name="accountType"
              control={control}
              label="Account Type"
              options={accountTypeOptions}
              rules={{ required: "Account type is required" }}
              fullWidth
            />
          </Box>

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

          <FormCheckbox
            name="isAvailable"
            control={control}
            label="Available to donate"
            size="small"
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
          Create Account
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
        Already have an account?
        <AuthToggle
          authName="Sign In"
          updateRegister={updateRegister}
          updateStatus={true}
        />
      </Typography>
    </Card>
  )
}

export default RegisterForm
