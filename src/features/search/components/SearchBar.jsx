import { useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"

const SearchBar = ({ value, onChange, onClear }) => {
  const [focused, setFocused] = useState(false)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search users..."
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),

            endAdornment: value && (
              <InputAdornment position="end">
                <IconButton onClick={onClear} edge="end">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          maxWidth: "40rem",
          transition: "box-shadow 0.2s ease",
          boxShadow: focused ? "0 0 0 2px rgba(25, 118, 210, 0.15)" : "none",
          borderRadius: 1,
        }}
        inputProps={{
          autoComplete: "off",
        }}
      />
    </Box>
  )
}

export default SearchBar
