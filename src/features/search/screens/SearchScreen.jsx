import { useState } from "react"
import Box from "@mui/material/Box"
import SearchBar from "../components/SearchBar"
import { Divider } from "@mui/material"
import SearchResults from "../components/SearchResults"

const SearchScreen = () => {
  const [query, setQuery] = useState("")

  const onClear = () => {
    setQuery("")
  }

  return (
    <Box sx={{ mt: { xs: 1, sm: 1.5 } }}>
      <SearchBar
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onClear={onClear}
      />

      <Divider sx={{ my: 2 }} />

      <SearchResults query={query} />
    </Box>
  )
}

export default SearchScreen
