import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { cancelRequest } from "../api/request.api"
import { useSnackbar } from "../../../hooks/useSnackbar"
import { getBloodRequests } from "../api/request.api"
import { getErrorMessage, isAbortError } from "../../../utils/getErrorMessage"

export const useRequests = () => {
  const navigate = useNavigate()
  const [requestState, setRequestState] = useState({
    requests: [],
    isLoading: true,
  })
  const [loadingRowId, setLoadingRowId] = useState(null)

  const {
    isOpen: isSnackbarOpen,
    message: snackbarMessage,
    status: snackbarStatus,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar()

  const [error, setError] = useState("")
  const [rowCount, setRowCount] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const fetchRequests = useCallback(async (page, pageSize, signal) => {
    try {
      setError("")
      const res = await getBloodRequests(page, pageSize, signal)

      if (res.status === 200) {
        setRequestState({
          requests: res?.data?.data?.content ?? [],
          isLoading: false,
        })

        setRowCount(res.data?.data?.totalElements ?? 0)
      }
    } catch (err) {
      if (isAbortError(err)) return

      setRequestState((prev) => ({ ...prev, isLoading: false }))

      const errMsg = getErrorMessage(err, {
        statusMessages: {
          404: "You don't have any requests yet. Make your first request.",
        },
      })
      setError(errMsg)
      console.error("Request table error", err)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    setRequestState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    fetchRequests(
      paginationModel.page,
      paginationModel.pageSize,
      controller.signal,
    )

    return () => controller.abort()
  }, [paginationModel.page, paginationModel.pageSize, fetchRequests])

  const onCancel = useCallback(
    async (id) => {
      if (loadingRowId) return

      setLoadingRowId(id)
      try {
        const res = await cancelRequest(id)

        if (res.status === 200) {
          await fetchRequests(paginationModel.page, paginationModel.pageSize)
          showSnackbar("success", res?.data?.message || "Request cancelled")
        }
      } catch (err) {
        showSnackbar(
          "error",
          err.response?.data?.message || "Request cancellation failed",
        )
        console.error("cancel failed", err)
      } finally {
        setLoadingRowId(null)
      }
    },
    [fetchRequests, loadingRowId],
  )

  const onView = useCallback(
    (id) => {
      navigate(`/requests/${id}`)
    },
    [navigate],
  )

  return {
    fetchRequests,
    requestState,
    error,
    rowCount,
    paginationModel,
    setPaginationModel,
    loadingRowId,
    onCancel,
    onView,
    toast: {
      open: isSnackbarOpen,
      message: snackbarMessage,
      status: snackbarStatus,
      hideSnackbar,
    },
  }
}
