import { Button, Stack } from "@mui/material"

const ActionCell = ({
  row,
  onAccept,
  onDecline,
  onView,
  loadingRowId,
  loadingActionType,
}) => {
  const rowId = row?.id
  const status = (row?.status ?? "").toLowerCase()
  const isAcceptLoading =
    loadingRowId === rowId && loadingActionType === "accept"
  const isDeclineLoading =
    loadingRowId === rowId && loadingActionType === "decline"
  const isAnyRowLoading = loadingRowId !== null

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

  if (status === "cancelled" || status === "closed") {
    return (
      <Button
        variant="text"
        color="error"
        sx={{ textTransform: "capitalize", cursor: "default" }}
      >
        {status}
      </Button>
    )
  }

  if (status === "declined") {
    return (
      <Button variant="outlined" size="small" disabled>
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

export default ActionCell
