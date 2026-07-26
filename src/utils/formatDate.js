export const formatDate = (dateInput) => {
  if (!dateInput) return ""

  const date = new Date(dateInput)

  if (isNaN(date.getTime())) return ""

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
