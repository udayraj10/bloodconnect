import { formatDate } from "../../../utils/formatDate"
import { urgencyVariant, offerStatusVariant } from "../../../utils/chipUtils"
import {
  Tag,
  Bloodtype,
  Location,
  Report,
  Info,
  Calendar,
  Person,
} from "../../../utils/icons"

export const formatOfferData = (offer) => [
  {
    key: "offerId",
    label: "Offer ID",
    value: offer?.id || "—",
    icon: <Tag />,
  },
  {
    key: "bloodGroup",
    label: "Blood group",
    value: offer?.bloodGroup || "—",
    icon: <Bloodtype />,
  },
  {
    key: "requestedBy",
    label: "Requested by",
    value: offer?.requestedBy || "—",
    icon: <Person />,
  },
  {
    key: "city",
    label: "City",
    value: offer?.city || "—",
    icon: <Location />,
  },
  {
    key: "urgency",
    label: "Urgency",
    value: offer?.urgencyLevel || "—",
    component: "chip",
    variant: urgencyVariant(offer?.urgencyLevel || "-"),
    icon: <Report />,
  },
  {
    key: "offeredAt",
    label: "Offered",
    value: formatDate(offer?.offeredAt),
    icon: <Calendar />,
  },
  {
    key: "status",
    label: "Status",
    value: offer?.status || "—",
    component: "chip",
    variant: offerStatusVariant(offer?.status || "-"),
    icon: <Info />,
  },
  {
    key: "respondedAt",
    label: "Responded",
    value: formatDate(offer?.respondedAt),
    icon: <Calendar />,
  },
]
