export const formatDate = (input) => {
  const value = input?.date ?? input

  if (!value) return ""

  let parsedDate

  if (value instanceof Date) {
    parsedDate = value
  } else if (typeof value === "string") {
    const trimmedValue = value.trim()

    if (!trimmedValue) return ""

    const [datePart, timePart = "00:00:00"] = trimmedValue.split(/[T ]/)
    const [year, month, day] = datePart.split("-").map(Number)

    if ([year, month, day].some(Number.isNaN)) return ""

    const [hour = 0, minute = 0, second = 0] = (timePart || "00:00:00")
      .split(":")
      .map((part) => Number(part.split(".")[0]))

    parsedDate = new Date(year, month - 1, day, hour, minute, second)
  } else {
    return ""
  }

  if (Number.isNaN(parsedDate.getTime())) return ""

  const day = String(parsedDate.getDate()).padStart(2, "0")
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
  const year = parsedDate.getFullYear()

  return `${day}-${month}-${year}`
}
