import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Paper, Typography, IconButton } from "@mui/material"
import { searchByUsername } from "../api/search.api"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import VisibilityIcon from "@mui/icons-material/Visibility"

const SearchResults = ({ username }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const onView = (id) => {
    navigate(`/search/${id}`)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function loadUser() {
      try {
        setLoading(true)
        setMessage("")

        const res = await searchByUsername(username, controller.signal)

        if (res.status === 200) {
          setUsers(res?.data?.data?.content ?? [])
        }
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.name === "AbortError" ||
          error.code === "ERR_CANCELED"
        ) {
          return
        }

        console.error("stas loading error", error)
        const errorMessage =
          error.response?.data?.message || "Failed to load user by username"

        setMessage(errorMessage)
      } finally {
        if (!controller.signal?.aborted) {
          setLoading(false)
        }
      }
    }

    loadUser()

    return () => controller.abort()
  }, [username])

  if (message) {
    return (
      <Typography variant="body1" color="primary" sx={{ textAlign: "center" }}>
        {message}
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mb: 5,
      }}
    >
      {users.map((user, index) => (
        <Paper
          key={index}
          variant="outlined"
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            width: {
              xs: "100%",
              md: "560px",
              lg: "640px",
              xl: "720px",
            },
          }}
        >
          <Box>
            <Typography variant="h6" component="h3">
              {user.fullName}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 0.5,
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <Typography variant="body2">Group: {user.bloodGroup}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "text.secondary",
                }}
              >
                <LocationOnIcon fontSize="small" color="primary" />
                <Typography variant="body2">{user.city}</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "500",
                color: user.isAvailable ? "success.main" : "error.main",
              }}
            >
              {user.isAvailable ? "Available" : "Unavailable"}
            </Typography>

            <IconButton
              color="primary"
              onClick={() => onView(user.id)}
              aria-label="view user details"
            >
              <VisibilityIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  )
}

export default SearchResults
