import CustomTooltip from "../../../components/ui/CustomTooltip"
import Chip from "../../../components/ui/Chip"
import ActionCell from "./ActionCell"
import { formatDate } from "../../../utils/formatDate"
import { urgencyVariant, offerStatusVariant } from "../../../utils/chipUtils"

export const getOffersColumns = ({
  onAccept,
  onDecline,
  onView,
  loadingRowId,
  loadingActionType,
}) => [
  { field: "bloodGroup", headerName: "Blood Group", flex: 1, minWidth: 130 },
  { field: "city", headerName: "City", flex: 1, minWidth: 120 },
  { field: "requestedBy", headerName: "Requested by", minWidth: 150, flex: 1 },
  {
    field: "urgencyLevel",
    headerName: "Urgency",
    minWidth: 130,
    flex: 1,
    renderCell: (params) => (
      <Chip variant={urgencyVariant(params.value)}>{params.value}</Chip>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 120,
    flex: 1,
    renderCell: (params) => (
      <CustomTooltip
        title="Another donor fulfilled this request"
        disable={params.value?.toLowerCase() !== "closed"}
      >
        <Chip variant={offerStatusVariant(params.value)}>{params.value}</Chip>
      </CustomTooltip>
    ),
  },
  {
    field: "offeredAt",
    headerName: "Offered on",
    width: 150,
    valueFormatter: (value) => (value ? formatDate(value) : ""),
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 220,
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <ActionCell
        row={params.row}
        onAccept={onAccept}
        onDecline={onDecline}
        onView={onView}
        loadingRowId={loadingRowId}
        loadingActionType={loadingActionType}
      />
    ),
  },
]
