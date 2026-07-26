import { DataGrid } from "@mui/x-data-grid"

const Table = ({
  columns,
  rows,
  loading,
  rowCount,
  paginationModel,
  setPaginationModel,
}) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      loading={loading}
      rowCount={rowCount}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      disableColumnMenu
      rowSelection={false}
      pageSizeOptions={[10]}
      sx={{
        border: 1,
        borderColor: "divider",

        "& .MuiDataGrid-cell": {
          px: 2,
        },
        "& .MuiDataGrid-columnHeader": {
          px: 2,
        },
      }}
    />
  )
}

export default Table
