import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { getOffers, acceptOffer, declineOffer } from "../api/offers.api"
import { useSnackbar } from "../../../hooks/useSnackbar"
import { getErrorMessage } from "../../../utils/getErrorMessage"

export const useOffers = () => {
  const navigate = useNavigate()
  const [dataState, setDataState] = useState({
    offers: [],
    isLoading: true,
  })
  const [loadingRowId, setLoadingRowId] = useState(null)
  const [loadingActionType, setLoadingActionType] = useState("")
  const [error, setError] = useState("")
  const [rowCount, setRowCount] = useState(0)

  const {
    isOpen: isSnackbarOpen,
    message: snackbarMessage,
    status: snackbarStatus,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const fetchOffers = useCallback(async (page, pageSize, signal) => {
    try {
      const res = await getOffers(page, pageSize, signal)

      if (res.status === 200) {
        setDataState({
          offers: res?.data?.data?.content ?? [],
          isLoading: false,
        })

        setRowCount(res.data?.data?.totalElements ?? 0)
        setError("")
      }
    } catch (err) {
      if (
        ["CanceledError", "AbortError"].includes(err.name) ||
        err.code === "ERR_CANCELED"
      ) {
        return
      }

      setDataState((prev) => ({ ...prev, isLoading: false }))

      const errMsg = getErrorMessage(err, {
        statusMessages: {
          404: "You haven't received any blood offers yet.",
        },
      })
      setError(errMsg)
      console.error("offers table error", err)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadData = async () => {
      setDataState((prev) => ({ ...prev, isLoading: true }))
      setError("")

      await fetchOffers(
        paginationModel.page,
        paginationModel.pageSize,
        controller.signal,
      )
    }

    loadData()
    return () => controller.abort()
  }, [paginationModel.page, paginationModel.pageSize, fetchOffers])

  const handleAction = async (
    id,
    actionType,
    apiCall,
    successMsg,
    errorMsg,
  ) => {
    if (loadingRowId) return
    setLoadingRowId(id)
    setLoadingActionType(actionType)

    try {
      const res = await apiCall(id)
      if (res.status === 200) {
        await fetchOffers(paginationModel.page, paginationModel.pageSize)
        showSnackbar("success", res?.data?.message || successMsg)
      }
    } catch (err) {
      showSnackbar("error", err.response?.data?.message || errorMsg)
      console.error(`${actionType} error:`, err)
    } finally {
      setLoadingRowId(null)
      setLoadingActionType("")
    }
  }

  const onAccept = (id) =>
    handleAction(
      id,
      "accept",
      acceptOffer,
      "Offer accepted successfully",
      "Failed to accept",
    )

  const onDecline = (id) =>
    handleAction(
      id,
      "decline",
      declineOffer,
      "Offer declined successfully",
      "Failed to decline",
    )

  const onView = (id) => navigate(`/offers/${id}`)

  return {
    dataState,
    error,
    rowCount,
    paginationModel,
    setPaginationModel,
    loadingRowId,
    loadingActionType,
    toast: {
      open: isSnackbarOpen,
      message: snackbarMessage,
      status: snackbarStatus,
      hideSnackbar,
    },
    onAccept,
    onDecline,
    onView,
  }
}
