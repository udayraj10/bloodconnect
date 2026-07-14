import { useState, useEffect } from "react"
import { getStats } from "../api/stats.api"
import SnackBar from "../../../components/ui/SnackBar"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import StatsItem from "../components/StatsItem"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Piechart from "../components/Piechart"
import Stack from "@mui/material/Stack"

const StatsScreen = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadStats() {
      try {
        setLoading(true)

        const res = await getStats(controller.signal)

        if (res.status === 200) {
          setStats(res?.data?.data ?? null)
        }
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.name === "AbortError" ||
          error.code === "ERR_CANCELED"
        ) {
          return
        }

        console.error("stas loading error", error)
        const errorMessage =
          error.response?.data?.message || "Failed to load stats"

        setIsOpen(true)
        setMessage(errorMessage)
        setStatus("error")
      } finally {
        if (!controller.signal?.aborted) {
          setLoading(false)
        }
      }
    }

    loadStats()

    return () => controller.abort()
  }, [])

  const donationData = [
    {
      label: "Total Donations",
      value: stats?.totalDonations ?? "-",
      description: "Total number of blood donations made by you",
    },
    {
      label: "Pending Offers",
      value: stats?.pendingOffers ?? "-",
      description: "Number of pending donation offers from you",
    },
    {
      label: "Accepted Offers",
      value: stats?.acceptedOffers ?? "-",
      description: "Number of accepted donation offers from you",
    },
    {
      label: "Completed Offers",
      value: stats?.completedOffers ?? "-",
      description: "Number of completed donation offers from you",
    },
    {
      label: "Declined Offers",
      value: stats?.declinedOffers ?? "-",
      description: "Number of declined donation offers from you",
    },
    {
      label: "Last Donation Date",
      value: stats?.lastDonationDate || "-",
      description: "Last date when you made a blood donation",
    },
  ]

  const requestData = [
    {
      label: "Total Requests",
      value: stats?.totalRequestsMade ?? "-",
      description: "Total number of blood requests made by you",
    },
    {
      label: "Open Requests",
      value: stats?.openRequests ?? "-",
      description: "Number of open blood requests from you",
    },
    {
      label: "Fulfilled Requests",
      value: stats?.fulfilledRequests ?? "-",
      description: "Number of fulfilled blood requests from you",
    },
    {
      label: "Cancelled Requests",
      value: stats?.cancelledRequests ?? "-",
      description: "Number of cancelled blood requests from you",
    },
  ]

  const overview = [
    { label: "Donations", value: stats?.totalDonations, color: "#e10600" },
    { label: "Requests", value: stats?.totalRequestsMade, color: "#393cf9" },
  ]

  const requestDistribution = [
    { label: "Open", value: stats?.openRequests, color: "#393cf9" },
    { label: "Fulfilled", value: stats?.fulfilledRequests, color: "#16a34a" },
    { label: "Cancelled", value: stats?.cancelledRequests, color: "#ed6c02" },
  ]

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (stats === null || stats === undefined) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography
          variant="body1"
          component="h1"
          color="error"
          sx={{ textAlign: "center" }}
        >
          Something went wrong
        </Typography>
        <Typography
          variant="body2"
          component="h1"
          color="error"
          sx={{ textAlign: "center" }}
        >
          Please check your internet connection
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: { xs: 2, sm: 1 } }}>
      <Typography variant="h6" component="h1" sx={{ mb: 1 }}>
        My Donations
      </Typography>

      <StatsItem data={donationData} />

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" component="h1" sx={{ mb: 1 }}>
        My Requests
      </Typography>

      <StatsItem data={requestData} />

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" component="h1" sx={{ mb: 1 }}>
        Overview
      </Typography>

      <Stack spacing={2} direction="row">
        <Piechart data={overview} title="Donations & Requests" />
        <Piechart
          data={requestDistribution}
          title="Request Status Distribution"
        />
      </Stack>

      <SnackBar
        open={isOpen}
        message={message}
        handleClose={() => setIsOpen(false)}
        status={status}
      />
    </Box>
  )
}

export default StatsScreen
