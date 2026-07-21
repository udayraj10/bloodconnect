import { useMemo } from "react"
import { Typography } from "@mui/material"
import TableBox from "../../../components/ui/TableBox"
import Table from "../../../components/ui/Table"
import SnackBar from "../../../components/ui/SnackBar"
import FailureFallback from "../../../components/ui/FailureFallback"
import Progress from "../../../components/ui/Progress"
import { useOffers } from "../hooks/useOffers"
import { getOffersColumns } from "../constants/tableColumns"

const OffersTable = () => {
  const {
    dataState,
    error,
    rowCount,
    paginationModel,
    setPaginationModel,
    loadingRowId,
    loadingActionType,
    toast,
    onAccept,
    onDecline,
    onView,
  } = useOffers()

  const { offers, isLoading } = dataState

  const columns = useMemo(
    () =>
      getOffersColumns({
        onAccept,
        onDecline,
        onView,
        loadingRowId,
        loadingActionType,
      }),
    [onAccept, onDecline, onView, loadingRowId, loadingActionType],
  )

  if (error) return <FailureFallback message={error} />

  if (isLoading && offers.length === 0) return <Progress />

  return (
    <TableBox>
      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
        Received Offers
      </Typography>

      <Table
        columns={columns}
        rows={offers}
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

export default OffersTable
