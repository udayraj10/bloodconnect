export const urgencyVariant = (type) => {
  switch (type.toLowerCase()) {
    case "normal":
      return "info"
    case "urgent":
      return "warning"
    case "critical":
      return "error"
    default:
      return "info"
  }
}

export const requestStatusVariant = (type) => {
  switch (type.toLowerCase()) {
    case "open":
      return "info"
    case "fulfilled":
      return "success"
    case "cancelled":
      return "error"
    default:
      return "info"
  }
}

export const offerStatusVariant = (type) => {
  switch (type.toLowerCase()) {
    case "pending":
      return "info"
    case "accepted":
      return "success"
    case "declined":
      return "error"
    case "completed":
      return "success"
    case "cancelled":
      return "error"
    case "closed":
      return "muted"
    default:
      return "info"
  }
}

export const accountVariant = (type) => {
  switch (type.toLowerCase()) {
    case "individual":
      return "purple"
    case "organization":
      return "cyan"
    default:
      return "purple"
  }
}
