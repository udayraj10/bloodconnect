import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { completeOffer, getOffer } from "../api/offers.api"
import SnackBar from "../../../components/ui/SnackBar"
import Chip from "../../../components/ui/Chip"
import FailureFallback from "../../../components/ui/FailureFallback"
import Progress from "../../../components/ui/Progress"
import Divider from "@mui/material/Divider"
import { useSnackbar } from "../../../hooks/useSnackbar"
import { formatOfferData } from "../utils/formatOfferData"

const OfferDetailsCard = () => {
  const { id } = useParams()
  const [offerState, setOfferState] = useState({
    offer: null,
    isLoading: true,
  })
  const { status, message, isOpen, showSnackbar, hideSnackbar } = useSnackbar()
  const [error, setError] = useState("")
  const [completing, setCompleting] = useState(false)

  const fetchOffer = useCallback(
    async (signal) => {
      try {
        const res = await getOffer(id, signal)

        if (res.status === 200) {
          setOfferState({
            offer: res?.data?.data ?? [],
            isLoading: false,
          })
          setError("")
        }
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.name === "AbortError" ||
          error.code === "ERR_CANCELED"
        ) {
          return
        }

        setOfferState((prev) => ({ ...prev, isLoading: false }))

        if (error.response) {
          setError(error.response?.data?.message || "Server error")
        } else if (error.request) {
          if (navigator.onLine) {
            setError(
              "Service is temporarily unavailable. Please try again shortly.",
            )
          } else {
            setError("Network connection failed. Please check your internet.")
          }
        } else {
          setError("An unexpected error occurred. Please refresh the page.")
        }

        console.error("offer loading error", error)
      }
    },
    [id],
  )

  useEffect(() => {
    const controller = new AbortController()

    const loadOffer = async () => {
      setOfferState((prev) => ({ ...prev, isLoading: true }))
      await fetchOffer(controller.signal)
    }

    loadOffer()
    return () => controller.abort()
  }, [fetchOffer])

  const handleCompleteOffer = async () => {
    setCompleting(true)
    try {
      const res = await completeOffer(id)
      if (res.status === 200 || res.status === 201) {
        showSnackbar("success", res.data?.message || "Offer completed")
        await fetchOffer()
      }
    } catch (error) {
      showSnackbar(
        "success",
        error.response?.data?.message || "Failed to complete offer",
      )

      console.error("offer completion error", error)
    } finally {
      setCompleting(false)
    }
  }

  const offerData = formatOfferData(offerState.offer)

  const isCompleted =
    (offerState.offer?.status ?? "").toLowerCase() === "completed"

  if (offerState.isLoading) return <Progress />

  if (error) return <FailureFallback message={error} />

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: { xs: 0.5, md: 1 },
        mb: 4,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 560, md: 720 },
          maxWidth: 720,
          minWidth: { xs: 0, sm: 320 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
          boxShadow: "none",
        }}
      >
        <Typography variant="h5" component="h1" sx={{ px: 3, py: 2 }}>
          Offer Details
        </Typography>

        <Divider />

        <Typography variant="h6" sx={{ px: 3, py: 2 }}>
          {offerState.offer?.message || "No message available"}
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 2.5 }} sx={{ px: 3, pb: 3 }}>
          {offerData.map((item) => (
            <Grid item size={{ xs: 12, sm: 6 }} key={item.label}>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  px: 2,
                  py: 1.25,
                  bgcolor: "background.paper",
                  gap: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                {item.component === "chip" ? (
                  <Box>
                    <Chip variant={item.variant}>{item.value}</Chip>
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.value}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {!isCompleted && (
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "stretch", sm: "flex-end" },
              p: 3,
              pt: 0,
            }}
          >
            <Button
              variant="contained"
              color="success"
              loading={completing}
              loadingPosition="start"
              disabled={isCompleted}
              onClick={handleCompleteOffer}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {isCompleted ? "Completed" : "Complete Offer"}
            </Button>
          </Box>
        )}
      </Box>

      <SnackBar
        open={isOpen}
        message={message}
        handleClose={hideSnackbar}
        status={status}
      />
    </Box>
  )
}

export default OfferDetailsCard
