import { useState, useEffect, useCallback } from "react"
import Box from "@mui/material/Box"
import RequestForm from "../components/RequestForm"
import { getBloodRequests } from "../api/request.api"
import AllBloodRequests from "../components/AllBloodRequests"
import { Container, Divider, Typography } from "@mui/material"
import SnackBar from "../../../components/ui/SnackBar"

const RequestScreen = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const loadRequests = useCallback(async (signal) => {
    setLoading(true)
    try {
      const res = await getBloodRequests(signal)

      if (res.status === 200) {
        setRequests(res?.data?.data?.content ?? [])
      }
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.name === "AbortError" ||
        error.code === "ERR_CANCELED"
      ) {
        return
      }

      console.error("get blood requests not loaded", error)
      const errorMessage =
        error.response?.data?.message || "Failed to load blood requests"

      setIsOpen(true)
      setMessage(errorMessage)
      setStatus("error")
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    loadRequests(controller.signal)

    return () => controller.abort()
  }, [loadRequests])

  return (
    <Box sx={{ mt: { xs: 0.5, sm: 1 } }}>
      <RequestForm loadRequests={loadRequests} />

      <Divider sx={{ my: 2 }} />

      <AllBloodRequests
        requests={requests}
        loadRequests={loadRequests}
        loading={loading}
      />

      <SnackBar
        open={isOpen}
        message={message}
        status={status}
        handleClose={() => setIsOpen(false)}
      />
    </Box>
  )
}

export default RequestScreen
