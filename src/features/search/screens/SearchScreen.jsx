import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SearchBar from "../components/SearchBar"
import { Divider } from "@mui/material"
import SearchResults from "../components/SearchResults"

const SearchScreen = () => {
  const [username, setUsername] = useState("")

  const onClear = () => {
    setUsername("")
  }

  return (
    <Box sx={{ mt: { xs: 2, md: 1 } }}>
      <SearchBar
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        onClear={onClear}
      />

      <Divider sx={{ my: 2 }} />

      <SearchResults username={username} />
    </Box>
  )
}

export default SearchScreen
