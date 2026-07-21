import { useState, useCallback } from "react"

export function useSnackbar(initialIsOpen = false) {
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(initialIsOpen)

  const showSnackbar = useCallback((statusType, snackbarMessage) => {
    setStatus(statusType)
    setMessage(snackbarMessage)
    setIsOpen(true)
  }, [])

  const hideSnackbar = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    status,
    message,
    isOpen,
    showSnackbar,
    hideSnackbar,
  }
}
