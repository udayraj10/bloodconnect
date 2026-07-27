import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Stack, Typography, Pagination, Divider } from "@mui/material"
import FailureFallback from "../../../components/ui/FailureFallback"
import Progress from "../../../components/ui/Progress"
import { searchByUsername } from "../api/search.api"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { getErrorMessage, isAbortError } from "../../../utils/getErrorMessage"

const PAGE_SIZE = 5

const SearchResults = ({ username }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    setPage(1)
  }, [username])

  useEffect(() => {
    const controller = new AbortController()

    async function loadUser() {
      try {
        setLoading(true)
        setError("")

        const res = await searchByUsername(
          username,
          page - 1,
          PAGE_SIZE,
          controller.signal,
        )

        if (res.status === 200) {
          setUsers(res?.data?.data?.content ?? [])
          setTotalPages(res?.data?.data?.totalPages ?? 0)
        }
      } catch (err) {
        if (isAbortError(err)) return

        setError(getErrorMessage(err))
        setUsers([])
        setTotalPages(0)
        console.error("Search error", err)
      } finally {
        if (!controller.signal?.aborted) {
          setLoading(false)
        }
      }
    }

    if (username) {
      loadUser()
    }

    return () => controller.abort()
  }, [username, page])

  const handlePageChange = (_, value) => {
    setPage(value)
  }

  const handleUserClick = (id) => {
    navigate(`/search/${id}`)
  }

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleUserClick(id)
    }
  }

  if (loading && username !== "") return <Progress />

  if (!username) return null

  if (error && users.length === 0) return <FailureFallback message={error} />

  return (
    <Stack spacing={2} sx={{ alignItems: "center", mb: 5, width: "100%" }}>
      {users.length > 0 && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "40rem",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 1,
            overflow: "hidden",
          }}
        >
          <Stack divider={<Divider flexItem />}>
            {users.map((user) => {
              const userId = user.id

              return (
                <Box
                  key={userId}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleUserClick(user.id)}
                  onKeyDown={(e) => handleKeyDown(e, user.id)}
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: "primary.main",
                      outlineOffset: "-3px",
                    },
                  }}
                >
                  <Stack spacing={0.5}>
                    <Typography
                      variant="body1"
                      component="h3"
                      sx={{ fontWeight: 500 }}
                    >
                      {user.fullName}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ color: "text.secondary" }}
                    >
                      <Typography variant="body2">
                        Group: {user.bloodGroup}
                      </Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <LocationOnIcon fontSize="small" color="primary" />
                        <Typography variant="body2">{user.city}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: user.isAvailable ? "success.main" : "error.main",
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    {user.isAvailable ? "Available" : "Not available"}
                  </Typography>
                </Box>
              )
            })}
          </Stack>
        </Box>
      )}

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          disabled={loading}
          color="primary"
          sx={{ mt: 2 }}
        />
      )}
    </Stack>
  )
}

export default SearchResults
