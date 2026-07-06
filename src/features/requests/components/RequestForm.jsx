import { useState } from "react"
import { useForm } from "react-hook-form"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Stack from "@mui/material/Stack"
import FormAutocomplete from "../../../components/ui/FormAutocomplete"
import FormTextField from "../../../components/ui/FormTextField"
import { bloodGroupOptions, urgencyOptions } from "../../../utils/options"
import { Typography } from "@mui/material"
import SnackBar from "../../../components/ui/SnackBar"
import { createRequest } from "../api/request.api"

const RequestForm = ({ loadRequests }) => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      bloodGroup: "",
      city: "",
      urgencyLevel: "",
      message: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const res = await createRequest(data)
      if (res.status == 201) {
        reset()

        setIsOpen(true)
        setMessage(res?.data?.message)
        setStatus("success")

        loadRequests()
      }
    } catch (error) {
      console.error("create request failed", error)

      setIsOpen(true)
      setMessage(error.response?.data?.message || "Failed request")
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    reset()
  }

  return (
    <>
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        variant="outlined"
        sx={{ p: 2 }}
      >
        <CardHeader
          title={<Typography variant="h6">Create blood request</Typography>}
          sx={{
            p: 0,
            backgroundColor: "transparent",
          }}
        />

        <CardContent sx={{ px: 0, pt: 1 }}>
          <Stack spacing={2.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
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
                name="city"
                control={control}
                label="City"
                rules={{ required: "City is required" }}
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
              <FormAutocomplete
                name="urgencyLevel"
                control={control}
                label="Urgency"
                options={urgencyOptions}
                rules={{ required: "Urgency is required" }}
                fullWidth
              />

              <FormTextField
                name="message"
                control={control}
                label="Message"
                rules={{
                  required: "Message is required",
                  minLength: { value: 5, message: "Minimum 5 characters" },
                }}
                fullWidth
              />
            </Box>
          </Stack>
        </CardContent>

        <CardActions sx={{ px: 0, gap: 1 }}>
          <Button type="button" variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            loadingPosition="start"
            variant="contained"
          >
            Submit Request
          </Button>
        </CardActions>
      </Card>

      <SnackBar
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        message={message}
        status={status}
      />
    </>
  )
}

export default RequestForm
