import { urgencyVariant, requestStatusVariant } from "../../../utils/chipUtils"
import { formatDate } from "../../../utils/formatDate"

export const formatRequestData = (request) => [
  { label: "Request ID", value: request?.id || "-" },
  { label: "Blood Group", value: request?.bloodGroup || "-" },
  { label: "City", value: request?.city || "-" },
  {
    label: "Urgency",
    value: request?.urgencyLevel || "-",
    component: "chip",
    variant: urgencyVariant(request?.urgencyLevel || "-"),
  },
  {
    label: "Request Status",
    value: request?.status || "-",
    component: "chip",
    variant: requestStatusVariant(request?.status || "-"),
  },
  { label: "Message", value: request?.message || "-" },
  { label: "Requested on", value: formatDate(request?.createdAt || "-") },
]
