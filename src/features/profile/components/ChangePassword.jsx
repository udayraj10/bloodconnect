import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormTextField from "../../../components/ui/FormTextField"
import { changePassword } from "../api/profile.api"
import SnackBar from "../../../components/ui/SnackBar"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

const defaultValues = {
  newPassword: "",
  confirmPassword: "",
}

const ChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState("")

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [reset])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      setStatus("")
      const res = await changePassword(data)

      if (res.status === 200) {
        reset(defaultValues)
        setIsOpen(true)
        setMessage(res.data.message)
        setStatus("success")
      }
    } catch (error) {
      console.error("Password mismatch: ", error)

      const errorMessage = error.response?.data?.message || "Password Mismatch"

      setIsOpen(true)
      setMessage(errorMessage)
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      variant="outlined"
      sx={{ flexGrow: 1, height: "fit-content" }}
    >
      <CardHeader
        title={<Typography variant="h6">Change Password</Typography>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            Keep your account secure
          </Typography>
        }
        sx={{ p: 2, pb: 0, backgroundColor: "transparent" }}
      />
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormTextField
            name="newPassword"
            control={control}
            label="New Password"
            type="password"
            rules={{
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            fullWidth
          />

          <FormTextField
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            type="password"
            rules={{
              required: "Please confirm your password",
            }}
            fullWidth
          />
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<LockOutlinedIcon />}
          loading={loading}
          loadingPosition="start"
        >
          Update Password
        </Button>
      </CardActions>

      <SnackBar
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        message={message}
        status={status}
      />
    </Card>
  )
}

export default ChangePassword
