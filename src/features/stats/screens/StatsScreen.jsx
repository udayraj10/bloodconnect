import { useState, useEffect } from "react"
import { getStats } from "../api/stats.api"
import FallbackFailure from "../../../components/ui/FailureFallback"
import Progress from "../../../components/ui/Progress"
import Box from "@mui/material/Box"
import StatsItem from "../components/StatsItem"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Piechart from "../components/Piechart"
import Stack from "@mui/material/Stack"
import {
  getDonationData,
  getRequestData,
  getOverview,
  getRequestDistribution,
} from "../utils/formatStatsData"
import { getErrorMessage } from "../../../utils/getErrorMessage"

const StatsScreen = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadStats() {
      try {
        setLoading(true)

        const res = await getStats(controller.signal)

        if (res.status === 200) {
          setStats(res?.data?.data ?? null)
          setError("")
        }
      } catch (err) {
        if (
          err.name === "CanceledError" ||
          err.name === "AbortError" ||
          err.code === "ERR_CANCELED"
        ) {
          return
        }

        setError(getErrorMessage(err))

        console.error("stas loading error", err)
      } finally {
        if (!controller.signal?.aborted) {
          setLoading(false)
        }
      }
    }

    loadStats()

    return () => controller.abort()
  }, [])

  const donationData = getDonationData(stats)

  const requestData = getRequestData(stats)

  const overview = getOverview(stats)

  const requestDistribution = getRequestDistribution(stats)

  if (loading && !stats) return <Progress />

  if (error && !stats) return <FallbackFailure message={error} />

  const showOverview = stats
    ? Boolean(stats.totalDonations || stats.totalRequestsMade)
    : false

  return (
    <Box sx={{ mt: { xs: 0.5, sm: 1 }, mb: 4 }}>
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

      {showOverview && (
        <>
          <Typography variant="h6" component="h1" sx={{ mb: 1 }}>
            Overview
          </Typography>

          <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
            <Piechart data={overview} title="Donations & Requests" />
            <Piechart
              data={requestDistribution}
              title="Request Status Distribution"
            />
          </Stack>
        </>
      )}
    </Box>
  )
}

export default StatsScreen
