import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Typography } from "@mui/material"
import CustomTooltip from "../../../components/ui/CustomTooltip"
import { getOffers, acceptOffer, declineOffer } from "../api/offers.api"
import TableBox from "../../../components/ui/TableBox"
import Table from "../../../components/ui/Table"
import SnackBar from "../../../components/ui/SnackBar"
import Chip from "../../../components/ui/Chip"
import FailureFallback from "../../../components/ui/FailureFallback"
import Progress from "../../../components/ui/Progress"
import { formatDate } from "../../../utils/formatDate"
import { urgencyVariant, offerStatusVariant } from "../../../utils/chipUtils"
import ActionCell from "./ActionCell"

const OffersTable = () => {
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [backgroundLoading, setBackgroundLoading] = useState(false)
  const [loadingRowId, setLoadingRowId] = useState(null)
  const [loadingActionType, setLoadingActionType] = useState("")
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const [rowCount, setRowCount] = useState(0)

  const isFirstLoad = useRef(true)

  const loadOffers = useCallback(
    async (signal, isBackground = false) => {
      try {
        if (isBackground) {
          setBackgroundLoading(true)
        } else {
          setInitialLoading(true)
        }

        const res = await getOffers(
          paginationModel.page,
          paginationModel.pageSize,
          signal,
        )

        if (res.status === 200) {
          setOffers(res?.data?.data?.content ?? [])
          setRowCount(res.data?.data?.totalElements)
        }
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.name === "AbortError" ||
          error.code === "ERR_CANCELED"
        ) {
          return
        }

        console.error("offers table error", error)

        if (error.response) {
          const statusCode = error.response.status

          if (statusCode === 404) {
            setError("You haven't received any blood offers yet.")
          } else {
            setError(error.response?.data?.message || "Server error")
          }
        } else if (error.request) {
          setError("Network connection failed. Please check you internet.")
        } else {
          setError("An unexpected error occurred. Please refresh the page.")
        }
      } finally {
        setBackgroundLoading(false)
        setInitialLoading(false)
      }
    },
    [paginationModel],
  )

  useEffect(() => {
    const controller = new AbortController()

    loadOffers(controller.signal, !isFirstLoad.current)

    isFirstLoad.current = false

    return () => controller.abort()
  }, [loadOffers])

  const onAccept = async (id) => {
    if (loadingRowId) return

    setLoadingRowId(id)
    setLoadingActionType("accept")

    try {
      const res = await acceptOffer(id)

      if (res.status === 200) {
        setIsOpen(true)
        setMessage(res?.data?.message || "Accepted successfully")
        setStatus("success")

        await loadOffers(true)
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
    if (loadingRowId) return

    setLoadingRowId(id)
    setLoadingActionType("decline")

    try {
      const res = await declineOffer(id)

      if (res.status === 200) {
        setIsOpen(true)
        setMessage(res?.data?.message || "Declined successfully")
        setStatus("success")

        await loadOffers(true)
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
        minWidth: 130,
      },
      { field: "city", headerName: "City", flex: 1, minWidth: 120 },
      {
        field: "requestedBy",
        headerName: "Requested by",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "urgencyLevel",
        headerName: "Urgency",
        minWidth: 130,
        flex: 1,
        renderCell: (params) => (
          <Chip variant={urgencyVariant(params.value)}>{params.value}</Chip>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 120,
        flex: 1,
        renderCell: (params) => (
          <CustomTooltip
            title="Another donor fulfilled this request"
            disable={params.value?.toLowerCase() !== "closed"}
          >
            <Chip variant={offerStatusVariant(params.value)}>
              {params.value}
            </Chip>
          </CustomTooltip>
        ),
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
    [onAccept, onDecline, onView, loadingRowId, loadingActionType],
  )

  if (initialLoading) {
    return <Progress />
  }

  if (error) {
    return <FailureFallback message={error} />
  }

  return (
    <TableBox>
      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
        Received Offers
      </Typography>

      <Table
        columns={columns}
        rows={offers}
        loading={backgroundLoading}
        rowCount={rowCount}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />

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
