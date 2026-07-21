import { formatDate } from "../../../utils/formatDate"
import { urgencyVariant, offerStatusVariant } from "../../../utils/chipUtils"

export const formatOfferData = (offer) => [
  { label: "Offer ID", value: offer?.id || "—" },
  { label: "Blood group", value: offer?.bloodGroup || "—" },

  { label: "Requested by", value: offer?.requestedBy || "—" },
  { label: "City", value: offer?.city || "—" },
  {
    label: "Urgency",
    value: offer?.urgencyLevel || "—",
    component: "chip",
    variant: urgencyVariant(offer?.urgencyLevel || "-"),
  },
  { label: "Offered at", value: formatDate(offer?.offeredAt) },
  {
    label: "Status",
    value: offer?.status || "—",
    component: "chip",
    variant: offerStatusVariant(offer?.status || "-"),
  },
  { label: "Responded at", value: formatDate(offer?.respondedAt) },
]
