import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import Progress from "../../../components/ui/Progress"
import ProfileCard from "../../../components/ui/ProfileCard"
import { getUserById } from "../api/search.api"
import FailureFallback from "../../../components/ui/FailureFallback"

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadUser() {
      try {
        setLoading(true)
        setError("")

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

        setError(errorMessage)
      } finally {
        if (!controller.signal?.aborted) {
          setLoading(false)
        }
      }
    }

    loadUser()

    return () => controller.abort()
  }, [id])

  if (loading) return <Progress />

  if (error) return <FailureFallback message={error} />

  return (
    <Box sx={{ mt: { xs: 1, sm: 1.5 } }}>
      <ProfileCard user={user} />
    </Box>
  )
}

export default UserProfile
