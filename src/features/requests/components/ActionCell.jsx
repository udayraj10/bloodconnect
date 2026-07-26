import { Stack, Button } from "@mui/material"

const ActionCell = ({ rowId, status, onCancel, onView, loadingRowId }) => {
  const loading = rowId === loadingRowId

  const handleCancelClick = (e) => {
    e.stopPropagation()
    onCancel(rowId)
  }

  const handleViewClick = (e) => {
    e.stopPropagation()
    onView(rowId)
  }

  const isCancelled = status?.toLowerCase() === "cancelled"
  const isFulfilled = status?.toLowerCase() === "fulfilled"

  const showCancelButton = !isCancelled && !isFulfilled

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        height: "100%",
      }}
    >
      <Button variant="contained" size="small" onClick={handleViewClick}>
        View
      </Button>

      {showCancelButton && (
        <Button
          variant="outlined"
          loading={loading}
          loadingPosition="start"
          size="small"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      )}
    </Stack>
  )
}

export default ActionCell
