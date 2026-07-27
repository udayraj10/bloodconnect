import { memo } from "react"
import { Button, Stack } from "@mui/material"

const ActionCell = ({
  rowId,
  status,
  onAccept,
  onDecline,
  onView,
  loadingRowId,
  loadingActionType,
}) => {
  const normalizedStatus = (status ?? "").toLowerCase()

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
    onView(rowId)
  }

  const isAcceptLoading =
    loadingRowId === rowId && loadingActionType === "accept"
  const isDeclineLoading =
    loadingRowId === rowId && loadingActionType === "decline"
  const isAnyRowLoading = loadingRowId !== null

  if (normalizedStatus === "cancelled" || normalizedStatus === "closed") {
    return (
      <Button size="small" sx={{ textTransform: "capitalize" }} disabled>
        {normalizedStatus}
      </Button>
    )
  }

  if (normalizedStatus === "declined") {
    return (
      <Button size="small" disabled>
        Declined
      </Button>
    )
  }

  if (normalizedStatus === "accepted" || normalizedStatus === "completed") {
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
        variant="contained"
        color="success"
        size="small"
        onClick={handleAcceptClick}
        loading={isAcceptLoading}
        disabled={isAnyRowLoading}
        loadingPosition="start"
      >
        Accept
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleDeclineClick}
        loading={isDeclineLoading}
        disabled={isAnyRowLoading}
        loadingPosition="start"
      >
        Decline
      </Button>
    </Stack>
  )
}

export default memo(ActionCell)
