import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Typography } from "@mui/material"
import { getOffers, acceptOffer, declineOffer } from "../api/offers.api"
import TableBox from "../../../components/ui/TableBox"
import Table from "../../../components/ui/Table"
import SnackBar from "../../../components/ui/SnackBar"
import { formatDate } from "../../../utils/formatDate"

const ActionCell = ({
  row,
  onAccept,
  onDecline,
  onView,
  loadingRowId,
  loadingActionType,
}) => {
  const rowId = row?.id ?? row?._id
  const detailId = row?.requestId ?? row?.request?.id ?? rowId
  const status = (row?.status ?? "").toLowerCase()
  const isAcceptLoading =
    loadingRowId === rowId && loadingActionType === "accept"
  const isDeclineLoading =
    loadingRowId === rowId && loadingActionType === "decline"

  const handleAcceptClick = (event) => {
    event.stopPropagation()
    onAccept(rowId)
  }

  const handleDeclineClick = (event) => {
    event.stopPropagation()
    onDecline(rowId)
  }

  const handleViewClick = (event) => {
    event.stopPropagation()
    onView(detailId)
  }

  if (status === "declined") {
    return (
      <Button variant="outlined" color="error" size="small" disabled>
        Declined
      </Button>
    )
  }

  if (status === "accepted" || status === "completed") {
    return (
      <Button
        variant="outlined"
        color="info"
        size="small"
        onClick={handleViewClick}
      >
        View Details
      </Button>
    )
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ height: "100%", alignItems: "center" }}
    >
      <Button
        variant="outlined"
        color="success"
        size="small"
        onClick={handleAcceptClick}
        loading={isAcceptLoading}
        loadingPosition="start"
      >
        {isAcceptLoading ? "Accepting" : "Accept"}
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleDeclineClick}
        loading={isDeclineLoading}
        loadingPosition="start"
      >
        {isDeclineLoading ? "Declining" : "Decline"}
      </Button>
    </Stack>
  )
}

const OffersTable = () => {
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingRowId, setLoadingRowId] = useState(null)
  const [loadingActionType, setLoadingActionType] = useState("")
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const loadOffers = useCallback(async () => {
    const controller = new AbortController()

    setLoading(true)

    try {
      const res = await getOffers(controller.signal)

      if (res.status === 200) {
        setOffers(res?.data?.data?.content ?? [])
      }
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.name === "AbortError" ||
        error.code === "ERR_CANCELED"
      ) {
        return
      }

      console.error("offers loading error", error)
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
  }, [])

  useEffect(() => {
    loadOffers()
  }, [loadOffers])

  const onAccept = async (id) => {
    setLoadingRowId(id)
    setLoadingActionType("accept")

    try {
      const res = await acceptOffer(id)

      if (res.status === 200) {
        await loadOffers()

        setIsOpen(true)
        setMessage(res?.data?.message || "Accepted successfully")
        setStatus("success")
      }
    } catch (error) {
      console.error("accept error", error)

      setIsOpen(true)
      setMessage(error.response?.data?.message || "Failed to accept")
      setStatus("error")
    } finally {
      setLoadingRowId(null)
      setLoadingActionType("")
    }
  }

  const onDecline = async (id) => {
    setLoadingRowId(id)
    setLoadingActionType("decline")

    try {
      const res = await declineOffer(id)

      if (res.status === 200) {
        await loadOffers()

        setIsOpen(true)
        setMessage(res?.data?.message || "Declined successfully")
        setStatus("success")
      }
    } catch (error) {
      console.error("decline error", error)

      setIsOpen(true)
      setMessage(error.response?.data?.message || "Failed to decline")
      setStatus("error")
    } finally {
      setLoadingRowId(null)
      setLoadingActionType("")
    }
  }

  const onView = (id) => {
    navigate(`/offers/${id}`)
  }

  const columns = useMemo(
    () => [
      {
        field: "bloodGroup",
        headerName: "Blood Group",
        flex: 1,
        minWidth: 150,
      },
      { field: "city", headerName: "City", flex: 1, minWidth: 120 },
      {
        field: "requestedBy",
        headerName: "Requested by",
        minWidth: 150,
        flex: 1,
      },
      { field: "urgencyLevel", headerName: "Urgency", minWidth: 130, flex: 1 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 120,
        flex: 1,
      },
      {
        field: "offeredAt",
        headerName: "Offered on",
        width: 150,
        valueFormatter: (value) => (value ? formatDate(value) : ""),
      },
      {
        field: "action",
        headerName: "Action",
        minWidth: 220,
        flex: 1,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <ActionCell
            row={params.row}
            onAccept={onAccept}
            onDecline={onDecline}
            onView={onView}
            loadingRowId={loadingRowId}
            loadingActionType={loadingActionType}
          />
        ),
      },
    ],
    [onAccept, onDecline, onView],
  )

  return (
    <TableBox>
      <Typography variant="h6" component="h2" sx={{ m: 2, mb: 1 }}>
        Received Offers
      </Typography>

      <Table columns={columns} requests={offers} loading={loading} />

      <SnackBar
        open={isOpen}
        message={message}
        handleClose={() => setIsOpen(false)}
        status={status}
      />
    </TableBox>
  )
}

export default OffersTable
