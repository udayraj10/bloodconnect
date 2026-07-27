import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Stack, Box } from "@mui/material"
import Progress from "../../../components/ui/Progress"
import ProfileCard from "../../../components/ui/ProfileCard"
import BackButton from "../../../components/ui/BackButton"
import { getUserById } from "../api/search.api"
import FailureFallback from "../../../components/ui/FailureFallback"
import { getErrorMessage, isAbortError } from "../../../utils/getErrorMessage"

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
      } catch (err) {
        if (isAbortError(err)) return

        setError(getErrorMessage(err))
        console.error("search user error", err)
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
    <Stack spacing={2} sx={{ mt: { xs: 1, sm: 1.5 } }}>
      <Box
        sx={{
          alignSelf: "flex-start",
        }}
      >
        <BackButton />
      </Box>
      <ProfileCard user={user} />
    </Stack>
  )
}

export default UserProfile
