import Box from "@mui/material/Box"

const AuthToggle = ({ authName, updateRegister, updateStatus }) => {
  return (
    <Box
      component="button"
      onClick={() => updateRegister(updateStatus)}
      sx={{
        color: "primary.main",
        fontWeight: "600",
        ml: 1,
        background: "none",
        border: "none",
      }}
    >
      {authName}
    </Box>
  )
}

export default AuthToggle
