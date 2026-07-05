import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

const SnackBar = ({ open, message, handleClose, status }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={status}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
