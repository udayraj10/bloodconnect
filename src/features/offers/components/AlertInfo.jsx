import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"

const AlertInfo = () => {
  return (
    <Alert severity="info" sx={{ backgroundColor: "#d9e7f5" }}>
      <AlertTitle>How Offers Work?</AlertTitle>
      When someone creates a blood request, we find matching donors and send
      offers. You can accept or decline an offer based on your availability.
    </Alert>
  )
}

export default AlertInfo
