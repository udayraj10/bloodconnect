import { memo } from "react"
import { Stack, Button } from "@mui/material"

const ActionCell = ({ rowId, status, onCancel, onView, loadingRowId }) => {
  const handleCancelClick = (e) => {
    e.stopPropagation()
    onCancel(rowId)
  }

  const handleViewClick = (e) => {
    e.stopPropagation()
    onView(rowId)
  }

  const isOpen = status?.toLowerCase() === "open"
  const loading = rowId === loadingRowId

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

      {isOpen && (
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

export default memo(ActionCell)
