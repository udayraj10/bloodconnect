import Box from "@mui/material/Box"

const TableBox = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        background: "#fff",
        borderRadius: 1,
      }}
    >
      {children}
    </Box>
  )
}

export default TableBox
