import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { completeOffer, getOffer } from "../api/offers.api"
import SnackBar from "../../../components/ui/SnackBar"
import Divider from "@mui/material/Divider"
import { formatDate } from "../../../utils/formatDate"

const OfferDetailsCard = () => {
  const { id } = useParams()
  const [offer, setOffer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [completing, setCompleting] = useState(false)

  const loadOffer = useCallback(async () => {
    const controller = new AbortController()

    setLoading(true)

    try {
      const res = await getOffer(id, controller.signal)

      if (res.status === 200) {
        setOffer(res?.data?.data ?? null)
      }
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.name === "AbortError" ||
        error.code === "ERR_CANCELED"
      ) {
        return
      }

      console.error("offer loading error", error)
      const errorMessage =
        error.response?.data?.message || "Failed to load offer"

      setIsOpen(true)
      setMessage(errorMessage)
      setStatus("error")
    } finally {
      if (!controller.signal?.aborted) {
        setLoading(false)
      }
    }
  }, [id])

  useEffect(() => {
    loadOffer()
  }, [loadOffer])

  const handleCompleteOffer = async () => {
    setCompleting(true)
    try {
      const res = await completeOffer(id)
      if (res.status === 200 || res.status === 201) {
        setIsOpen(true)
        setMessage(res.data?.message || "Completed")
        setStatus("success")
        await loadOffer()
      }
    } catch (error) {
      console.error("offer completion error", error)

      setIsOpen(true)
      setMessage(error.response?.data?.message || "Failed to complete offer")
      setStatus("error")
    } finally {
      setCompleting(false)
    }
  }

  const detailItems = [
    { label: "Blood group", value: offer?.bloodGroup || "—" },
    { label: "City", value: offer?.city || "—" },
    { label: "Offer ID", value: offer?.id || "—" },
    { label: "Urgency", value: offer?.urgencyLevel || "—" },
    { label: "Requested by", value: offer?.requestedBy || "—" },
    { label: "Offered at", value: formatDate(offer?.offeredAt) },
    { label: "Responded at", value: formatDate(offer?.respondedAt) },
    { label: "Status", value: offer?.status || "—" },
  ]

  const isCompleted = (offer?.status ?? "").toUpperCase() === "COMPLETED"

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: { xs: 1, md: 2 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 560, md: 720 },
          maxWidth: 720,
          minWidth: { xs: 0, sm: 320 },
        }}
      >
        <Box
          sx={{
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

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress size={28} />
            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ px: 3, py: 2 }}>
                {offer?.message || "No message available"}
              </Typography>

              <Grid
                container
                spacing={{ xs: 2, sm: 2.5 }}
                sx={{ px: 3, pb: 3 }}
              >
                {detailItems.map((item) => (
                  <Grid item size={{ xs: 12, sm: 6 }} key={item.label}>
                    <Box
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                        px: 2,
                        py: 1.25,
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {item.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {item.value}
                      </Typography>
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
                    onClick={handleCompleteOffer}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                  >
                    Complete offer
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      <SnackBar
        open={isOpen}
        message={message}
        handleClose={() => setIsOpen(false)}
        status={status}
      />
    </Box>
  )
}

export default OfferDetailsCard
