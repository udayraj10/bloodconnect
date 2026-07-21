import { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormAutocomplete from "../../../components/ui/FormAutocomplete"
import FormTextField from "../../../components/ui/FormTextField"
import { bloodGroupOptions, urgencyOptions } from "../../../utils/options"
import SnackBar from "../../../components/ui/SnackBar"
import { useSnackbar } from "../../../hooks/useSnackbar"
import { createRequest } from "../api/request.api"

const RequestForm = ({ fetchRequests, paginationModel }) => {
  const [loading, setLoading] = useState(false)
  const { isOpen, message, status, showSnackbar, hideSnackbar } = useSnackbar()

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
      if (res.status === 201) {
        reset()
        showSnackbar("success", res?.data?.message || "Request created")
        await fetchRequests(paginationModel.page, paginationModel.pageSize)
      }
    } catch (error) {
      showSnackbar("error", error.response?.data?.message || "Request failed")
      console.error("create request failed", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: "#fff",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Grid size={12}>
            <Typography variant="h6">Create blood request</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormAutocomplete
              name="bloodGroup"
              control={control}
              label="Blood Group"
              options={bloodGroupOptions}
              rules={{ required: "Blood group is required" }}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextField
              name="city"
              control={control}
              label="City"
              rules={{ required: "City is required" }}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormAutocomplete
              name="urgencyLevel"
              control={control}
              label="Urgency"
              options={urgencyOptions}
              rules={{ required: "Urgency is required" }}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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
          </Grid>

          <Grid size={12}>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
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
            </Stack>
          </Grid>
        </Grid>
      </form>

      <SnackBar
        open={isOpen}
        handleClose={hideSnackbar}
        message={message}
        status={status}
      />
    </>
  )
}

export default RequestForm
