import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import Progress from "../../../components/ui/Progress"
import ProfileCard from "../../../components/ui/ProfileCard"
import { getUserById } from "../api/search.api"
import FailureFallback from "../../../components/ui/FailureFallback"
import { getErrorMessage } from "../../../utils/getErrorMessage"

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

        const res = await getUserById(id, controller.signal)

        if (res.status === 200) {
          setUser(res?.data?.data || null)
          setError("")
        }
      } catch (err) {
        if (
          err.name === "CanceledError" ||
          err.name === "AbortError" ||
          err.code === "ERR_CANCELED"
        ) {
          return
        }

        setError(getErrorMessage(err))
        console.error("search user error", error)
      } finally {
        if (!controller.signal?.aborted) {
          setLoading(false)
        }
      }
    }

    loadUser()

    return () => controller.abort()
  }, [id])

  if (loading && !user) return <Progress />

  if (error && !user) return <FailureFallback message={error} />

  return (
    <Box sx={{ mt: { xs: 1, sm: 1.5 } }}>
      <ProfileCard user={user} />
    </Box>
  )
}

export default UserProfile
