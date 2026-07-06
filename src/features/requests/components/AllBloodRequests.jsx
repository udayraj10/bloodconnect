import { useState, useEffect, useCallback, useMemo } from "react"
import NoteAltIcon from "@mui/icons-material/NoteAlt"
import { useNavigate } from "react-router-dom"
import SnackBar from "../../../components/ui/SnackBar"
import { cancelRequest } from "../api/request.api"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Stack } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import Box from "@mui/material/Box"

const STATIC_COLUMNS = [
  { field: "bloodGroup", headerName: "Blood Group", flex: 1, minWidth: 110 },
  { field: "city", headerName: "City", flex: 1.2, minWidth: 120 },
  {
    field: "urgencyLevel",
    headerName: "Urgency Level",
    flex: 1.2,
    minWidth: 130,
  },
  { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
]

const ActionCell = ({ rowId, status, onCancel, onView }) => {
  const handleCancelClick = (e) => {
    e.stopPropagation()
    onCancel(rowId)
  }

  const handleViewClick = (e) => {
    e.stopPropagation()
    onView(rowId)
  }

  const isCancelled = status?.toLowerCase() === "cancelled"

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", height: "100%" }}
    >
      <Button
        variant="outlined"
        disabled={isCancelled}
        size="small"
        onClick={handleCancelClick}
      >
        {isCancelled ? "Cancelled" : "Cancel"}
      </Button>
      <Button variant="contained" size="small" onClick={handleViewClick}>
        View
      </Button>
    </Stack>
  )
}

const AllBloodRequests = ({ requests, loadRequests, loading }) => {
  const navigate = useNavigate()

  const onCancel = useCallback(
    async (id) => {
      try {
        const res = await cancelRequest(id)

        if (res.status === 200) {
          loadRequests()
          setIsOpen(true)
          setMessage(res?.data?.message)
          setStatus("success")
        }
      } catch (error) {
        console.error("cancel failed", error)

        setIsOpen(true)
        setMessage(error.response?.data?.message || "Cancel failed")
        setStatus("error")
      }
    },
    [loadRequests],
  )

  const onView = useCallback(
    (id) => {
      navigate(`/requests/${id}`)
    },
    [navigate],
  )

  const columns = useMemo(
    () => [
      ...STATIC_COLUMNS,
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        minWidth: 180,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <ActionCell
            rowId={params.row.id}
            status={params.row.status}
            onCancel={onCancel}
            onView={onView}
          />
        ),
      },
    ],
    [onCancel, navigate],
  )

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "auto",
        background: "#fff",
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          m: 2,
          mb: 1,
        }}
      >
        <NoteAltIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          My Blood Requests
        </Typography>
      </Box>

      <DataGrid
        columns={columns}
        rows={requests}
        loading={loading}
        disableColumnMenu
        rowSelection={false}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        sx={{
          "& .MuiDataGrid-cell": {
            px: 2,
          },

          "& .MuiDataGrid-columnHeader": {
            px: 2,
          },
        }}
      />
    </Box>
  )
}

export default AllBloodRequests
