import { useMemo } from "react"
import NoteAltIcon from "@mui/icons-material/NoteAlt"
import SnackBar from "../../../components/ui/SnackBar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Table from "../../../components/ui/Table"
import TableBox from "../../../components/ui/TableBox"
import { getRequestsColumns } from "./RequestsColumns"
import { useRequests } from "../hooks/useRequests"

const AllBloodRequests = ({ data }) => {
  const {
    requestState,
    rowCount,
    paginationModel,
    setPaginationModel,
    loadingRowId,
    onCancel,
    onView,
    toast,
  } = data

  const { requests, isLoading } = requestState

  const columns = useMemo(
    () => getRequestsColumns({ onCancel, onView, loadingRowId }),
    [(onCancel, onView, loadingRowId)],
  )

  return (
    <TableBox>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",

          mb: 1,
        }}
      >
        <NoteAltIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          My Blood Requests
        </Typography>
      </Box>

      <Table
        columns={columns}
        rows={requests}
        loading={isLoading}
        rowCount={rowCount}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />

      <SnackBar
        open={toast.open}
        message={toast.message}
        handleClose={toast.hideSnackbar}
        status={toast.status}
      />
    </TableBox>
  )
}

export default AllBloodRequests
