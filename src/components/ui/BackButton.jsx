import { useNavigate } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export default function BackButton({ fallbackPath = "/" }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate(fallbackPath)
    }
  }

  return (
    <IconButton aria-label="go back" onClick={handleBack}>
      <ArrowBackIcon />
    </IconButton>
  )
}
