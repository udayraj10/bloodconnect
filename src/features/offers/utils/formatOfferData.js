import { formatDate } from "../../../utils/formatDate"
import { urgencyVariant, offerStatusVariant } from "../../../utils/chipUtils"

export const formatOfferData = (offer) => [
  {
    key: "offerId",
    label: "Offer ID",
    value: offer?.id || "—",
  },
  {
    key: "bloodGroup",
    label: "Blood group",
    value: offer?.bloodGroup || "—",
  },
  {
    key: "requestedBy",
    label: "Requested by",
    value: offer?.requestedBy || "—",
  },
  {
    key: "city",
    label: "City",
    value: offer?.city || "—",
  },
  {
    key: "urgency",
    label: "Urgency",
    value: offer?.urgencyLevel || "—",
    component: "chip",
    variant: urgencyVariant(offer?.urgencyLevel || "-"),
  },
  {
    key: "offeredAt",
    label: "Offered",
    value: formatDate(offer?.offeredAt),
  },
  {
    key: "status",
    label: "Status",
    value: offer?.status || "—",
    component: "chip",
    variant: offerStatusVariant(offer?.status || "-"),
  },
  {
    key: "respondedAt",
    label: "Responded",
    value: formatDate(offer?.respondedAt),
  },
]
