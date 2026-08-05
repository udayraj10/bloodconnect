import { urgencyVariant, requestStatusVariant } from "../../../utils/chipUtils"
import {
  Tag,
  Bloodtype,
  Location,
  Report,
  Info,
  Message,
} from "../../../utils/icons"

export const formatRequestData = (request) => [
  {
    key: "requestId",
    label: "Request ID",
    value: request?.id || "-",
    icon: <Tag />,
  },
  {
    key: "bloodGroup",
    label: "Blood Group",
    value: request?.bloodGroup || "-",
    icon: <Bloodtype />,
  },
  {
    key: "city",
    label: "City",
    value: request?.city || "-",
    icon: <Location />,
  },
  {
    key: "urgency",
    label: "Urgency",
    value: request?.urgencyLevel || "-",
    component: "chip",
    variant: urgencyVariant(request?.urgencyLevel || "-"),
    icon: <Report />,
  },
  {
    key: "requestStatus",
    label: "Request Status",
    value: request?.status || "-",
    component: "chip",
    variant: requestStatusVariant(request?.status || "-"),
    icon: <Info />,
  },
  {
    key: "message",
    label: "Message",
    value: request?.message || "-",
    icon: <Message />,
  },
]
