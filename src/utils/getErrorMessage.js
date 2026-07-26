export const getErrorMessage = (error, options = {}) => {
  const { statusMessages = {}, fallbackMessage = "Server error occurred." } =
    options

  if (error.response) {
    const status = error.response.status

    if (statusMessages[status]) {
      return statusMessages[status]
    }
    return error.response?.data?.message || fallbackMessage
  }

  if (error.request) {
    return navigator.onLine
      ? "Service is temporarily unavailable. Please try again later."
      : "Network connection failed. Please check your internet."
  }

  return "An unexpected error occurred. Please refresh the page."
}
