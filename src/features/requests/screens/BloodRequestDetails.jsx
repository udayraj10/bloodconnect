import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import { Typography, CircularProgress, Alert, Chip } from "@mui/material" // Added CircularProgress
import Table from "../../../components/ui/Table"
import TableBox from "../../../components/ui/TableBox"
import SnackBar from "../../../components/ui/SnackBar"
import { getDonors, getBloodRequest } from "../api/request.api"
import { formatDate } from "../../../utils/formatDate"

const columns = [
  { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 150 },
  { field: "city", headerName: "City", flex: 1, minWidth: 120 },
  { field: "bloodGroup", headerName: "Blood Group", width: 120, flex: 1 },
  { field: "offerStatus", headerName: "Offer Status", width: 130, flex: 1 },
  {
    field: "offeredAt",
    headerName: "Offered At",
    width: 180,
    valueFormatter: (value) => (value ? formatDate(value) : ""),
  },
]

const BloodRequestDetails = () => {
  const { id } = useParams()
  const [donors, setDonors] = useState([])
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        setLoading(true)

        const [requestRes, donorsRes] = await Promise.all([
          getBloodRequest(id, controller.signal),
          getDonors(id, controller.signal),
        ])

        if (requestRes.status === 200) {
          setRequest(requestRes?.data?.data ?? null)
        }

        if (donorsRes.status === 200) {
          setDonors(donorsRes?.data?.data?.content ?? [])

          console.log(setDonors(donorsRes?.data?.data?.content ?? []))
        }
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.name === "AbortError" ||
          error.code === "ERR_CANCELED"
        ) {
          return
        }

        console.error("Data loading error", error)
        const errorMessage =
          error.response?.data?.message || "Failed to load details"

        setIsOpen(true)
        setMessage(errorMessage)
        setStatus("error")
      } finally {
        if (!controller.signal?.aborted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => controller.abort()
  }, [id])

  const requestData = [
    { label: "Request ID", value: request?.id || "-" },
    { label: "Blood Group", value: request?.bloodGroup || "-" },
    { label: "City", value: request?.city || "-" },
    { label: "Urgency", value: request?.urgencyLevel || "-" },
    { label: "Status", value: request?.status || "-" },
    { label: "Message", value: request?.message || "-" },
    { label: "Requested on", value: formatDate(request?.createdAt || "-") },
  ]

  return (
    <Stack
      spacing={3}
      sx={{
        mt: {
          xs: 2,
          sm: 1,
        },
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "#fff",
          p: 2,
          border: 1,
          borderRadius: 1,
          borderColor: "divider",
        }}
      >
        <Grid size={12}>
          <Typography variant="h6" component="h1">
            Blood Request Details
          </Typography>
        </Grid>

        {requestData.map((item, index) => (
          <Grid key={index} size={{ xs: 6, sm: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.label}
              </Typography>
              <Typography variant="body1">{item.value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <TableBox>
        <Typography variant="h6" component="h2" sx={{ m: 2, mb: 1 }}>
          Matched Donors
        </Typography>

        <Table columns={columns} requests={donors} loading={loading} />
      </TableBox>

      <SnackBar
        open={isOpen}
        message={message}
        handleClose={() => setIsOpen(false)}
        status={status}
      />
    </Stack>
  )
}

export default BloodRequestDetails
