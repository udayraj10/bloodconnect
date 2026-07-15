import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormAutocomplete from "../../../components/ui/FormAutocomplete"
import FormTextField from "../../../components/ui/FormTextField"
import FormCheckbox from "../../../components/ui/FormCheckbox"
import { useAuth } from "../../../context/AuthContext"
import { bloodGroupOptions } from "../../../utils/options"
import { updateProfile, deactivate } from "../api/profile.api"
import SnackBar from "../../../components/ui/SnackBar"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

const defaultValues = {
  fullName: "",
  email: "",
  age: "",
  phone: "",
  bloodGroup: "",
  city: "",
  address: "",
  isAvailable: false,
  lastDonationDate: "",
}

const UpdateProfile = ({ onEditClick }) => {
  const { user, refreshUser, logout } = useAuth()
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  })

  const resetValues = {
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    age: user?.age ?? "",
    phone: user?.phone ?? "",
    bloodGroup: user?.bloodGroup ?? "",
    city: user?.city ?? "",
    address: user?.address ?? "",
    isAvailable: user?.isAvailable ?? false,
    lastDonationDate: user?.lastDonationDate ?? "",
  }

  const onCancel = () => {
    reset(resetValues)
  }

  useEffect(() => {
    if (user) {
      reset(resetValues)
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      setStatus("")

      const res = await updateProfile(data)

      if (res.status === 200) {
        setIsOpen(true)
        setMessage(res.data.message)
        setStatus("success")
        refreshUser()
      }
    } catch (error) {
      console.error("update user", error)
      const responseData = error.response?.data

      let errorMessage = "Updation failed"

      if (responseData) {
        if (responseData.code === "VALIDATION_FAILED" && responseData.message) {
          errorMessage = Object.values(responseData.message).join(", ")
        } else if (typeof responseData.message === "string") {
          errorMessage = responseData.message
        }
      }

      setIsOpen(true)
      setMessage(errorMessage)
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setStatus("")

      const res = await deactivate()

      if (res.status === 200) {
        setIsOpen(true)
        setMessage(res.data.message)
        setStatus("success")
        logout()
      }
    } catch (error) {
      console.error("deactivate user", error)
      const errorMessage = error.response?.data?.message || "Failed to delete"

      setIsOpen(true)
      setMessage(errorMessage)
      setStatus("error")
    }
  }

  return (
    <Card
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      variant="outlined"
      sx={{
        p: 2,
        width: {
          xs: "100%",
          md: "70%",
        },
      }}
    >
      <CardHeader
        title={<Typography variant="h6">Update Profile</Typography>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            Update your profile information
          </Typography>
        }
        sx={{
          p: 0,
          mb: 2,
          backgroundColor: "transparent",
        }}
      />
      <CardContent sx={{ p: 0, pb: 2 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <FormTextField
              name="fullName"
              control={control}
              label="Full Name"
              fullWidth
            />

            <FormTextField
              name="email"
              control={control}
              label="Email"
              type="email"
              fullWidth
            />

            <FormTextField
              name="age"
              control={control}
              label="Age"
              type="number"
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <FormTextField
              name="phone"
              control={control}
              label="Phone"
              rules={{
                minLength: { value: 10, message: "Minimum 10 digits" },
              }}
              type="number"
              fullWidth
            />
            <FormAutocomplete
              name="bloodGroup"
              control={control}
              label="Blood Group"
              options={bloodGroupOptions}
              fullWidth
            />

            <FormTextField
              name="lastDonationDate"
              control={control}
              label="Last Donated"
              type="date"
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <FormTextField name="city" control={control} label="City" />

            <FormTextField
              name="address"
              control={control}
              label="Address"
              rules={{
                minLength: { value: 5, message: "Minimum 5 characters" },
              }}
              fullWidth
            />
          </Box>

          <FormCheckbox
            name="isAvailable"
            control={control}
            label="Available to donate"
            size="small"
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
            width: "100%",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="button"
              onClick={onCancel}
              variant="outlined"
              sx={{ borderColor: "text.primary", color: "text.primary" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              loadingPosition="start"
              variant="contained"
            >
              Save Changes
            </Button>
          </Box>

          <Button
            type="button"
            onClick={onDelete}
            variant="outlined"
            startIcon={<DeleteOutlinedIcon />}
            sx={{
              borderWidth: 2,
              width: "fit-content",
            }}
          >
            Delete Account
          </Button>
        </Box>
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

export default UpdateProfile
