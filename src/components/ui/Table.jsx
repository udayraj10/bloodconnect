import { DataGrid } from "@mui/x-data-grid"

const Table = ({ columns, rows, loading }) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
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
