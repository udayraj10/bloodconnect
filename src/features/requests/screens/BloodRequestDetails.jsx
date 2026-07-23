import { useParams } from "react-router-dom"
import { useState, useEffect, useMemo } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import { Divider, Typography } from "@mui/material"
import Table from "../../../components/ui/Table"
import TableBox from "../../../components/ui/TableBox"
import Chip from "../../../components/ui/Chip"
import FailureFallback from "../../../components/ui/FailureFallback"
import Progress from "../../../components/ui/Progress"
import { getDonors, getBloodRequest } from "../api/request.api"
import { getDonorColumns } from "../constants/tableColumns"
import { formatRequestData } from "../utils/formatRequestData"
import { getErrorMessage } from "../../../utils/getErrorMessage"

const BloodRequestDetails = () => {
  const { id } = useParams()

  const [requestDetailsState, setRequestDetailsState] = useState({
    request: null,
    donors: [],
    isLoading: true,
  })

  const [error, setError] = useState("")
  const [rowCount, setRowCount] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadRequestDetails() {
      try {
        setRequestDetailsState((prev) => ({ ...prev, isLoading: true }))

        const [requestRes, donorsRes] = await Promise.all([
          getBloodRequest(id, controller.signal),
          getDonors(
            id,
            paginationModel.page,
            paginationModel.pageSize,
            controller.signal,
          ),
        ])

        if (requestRes.status === 200 && donorsRes.status === 200) {
          setRequestDetailsState({
            request: requestRes?.data?.data ?? null,
            donors: donorsRes?.data?.data?.content ?? [],
            isLoading: false,
          })
          setRowCount(donorsRes?.data?.data?.totalElements ?? 0)
          setError("")
        }
      } catch (err) {
        if (
          ["CanceledError", "AbortError"].includes(err.name) ||
          err.code === "ERR_CANCELED"
        ) {
          return
        }

        setRequestDetailsState((prev) => ({ ...prev, isLoading: false }))

        setError(getErrorMessage(err))
        console.error("request details error", err)
      }
    }

    loadRequestDetails()

    return () => controller.abort()
  }, [id, paginationModel.page, paginationModel.pageSize])

  const { request, donors, isLoading } = requestDetailsState

  const columns = useMemo(() => getDonorColumns(), [])
  const requestData = formatRequestData(request)

  if (isLoading && !request && donors.length === 0) {
    return <Progress />
  }

  if (error && !request && donors.length === 0) {
    return <FailureFallback message={error} />
  }

  return (
    <Stack spacing={3} sx={{ mt: { xs: 1, sm: 2 }, mb: 4 }}>
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
              {item.component === "chip" ? (
                <Box>
                  <Chip variant={item.variant}>{item.value}</Chip>
                </Box>
              ) : (
                <Typography variant="body1">{item.value}</Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider />

      <TableBox>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Matched Donors
        </Typography>

        <Table
          columns={columns}
          rows={donors}
          loading={isLoading}
          rowCount={rowCount}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </TableBox>
    </Stack>
  )
}

export default BloodRequestDetails
