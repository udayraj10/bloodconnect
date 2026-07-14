import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import { CircularProgress } from "@mui/material"
import ProfileCard from "../../../components/ui/ProfileCard"
import { getUserById } from "../api/search.api"
import SnackBar from "../../../components/ui/SnackBar"

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUser() {
      try {
        setLoading(true)

        const res = await getUserById(id, controller.signal)

        if (res.status === 200) {
          setUser(res?.data?.data || null)
        }
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.name === "AbortError" ||
          error.code === "ERR_CANCELED"
        ) {
          return
        }

        console.error("search user error", error)
        const errorMessage =
          error.response?.data?.message || "Failed to load search user"

        setIsOpen(true)
        setMessage(errorMessage)
        setStatus("error")
      } finally {
        if (!controller.signal?.aborted) {
          setLoading(false)
        }
      }
    }

    loadUser()

    return () => controller.abort()
  }, [id])

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "30vh",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ mt: { xs: 0.5, md: 1 } }}>
      <ProfileCard user={user} />

      <SnackBar
        open={isOpen}
        message={message}
        handleClose={() => setIsOpen(false)}
        status={status}
      />
    </Box>
  )
}

export default UserProfile
