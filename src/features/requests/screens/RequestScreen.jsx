import Box from "@mui/material/Box"
import RequestForm from "../components/RequestForm"
import AllBloodRequests from "../components/AllBloodRequests"
import { Divider } from "@mui/material"
import FailureFallback from "../../../components/ui/FailureFallback"
import Progress from "../../../components/ui/Progress"
import { useRequests } from "../hooks/useRequests"

const RequestScreen = () => {
  const requestsData = useRequests()
  const { fetchRequests, requestState, error, paginationModel } = requestsData
  const { requests, isLoading } = requestState

  if (isLoading && requests.length === 0) return <Progress />

  if (error) return <FailureFallback message={error} />

  return (
    <Box sx={{ mt: { xs: 1, sm: 2 }, mb: 4 }}>
      <RequestForm
        fetchRequests={fetchRequests}
        paginationModel={paginationModel}
      />

      <Divider sx={{ my: 2 }} />

      <AllBloodRequests data={requestsData} />
    </Box>
  )
}

export default RequestScreen
