import Box from "@mui/material/Box"

const TableBox = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        minWidth: 0,
        overflowX: "hidden",
        background: "#fff",
        borderRadius: 1,
        p: 2,
      }}
    >
      {children}
    </Box>
  )
}

export default TableBox
