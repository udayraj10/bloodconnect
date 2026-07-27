import { urgencyVariant, requestStatusVariant } from "../../../utils/chipUtils"

export const formatRequestData = (request) => [
  {
    key: "requestId",
    label: "Request ID",
    value: request?.id || "-",
  },
  {
    key: "bloodGroup",
    label: "Blood Group",
    value: request?.bloodGroup || "-",
  },
  {
    key: "city",
    label: "City",
    value: request?.city || "-",
  },
  {
    key: "urgency",
    label: "Urgency",
    value: request?.urgencyLevel || "-",
    component: "chip",
    variant: urgencyVariant(request?.urgencyLevel || "-"),
  },
  {
    key: "requestStatus",
    label: "Request Status",
    value: request?.status || "-",
    component: "chip",
    variant: requestStatusVariant(request?.status || "-"),
  },
  {
    key: "message",
    label: "Message",
    value: request?.message || "-",
  },
]
