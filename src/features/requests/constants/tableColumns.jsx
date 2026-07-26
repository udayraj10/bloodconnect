import CustomTooltip from "../../../components/ui/CustomTooltip"
import Chip from "../../../components/ui/Chip"
import ActionCell from "../components/ActionCell"
import { formatDate } from "../../../utils/formatDate"
import {
  offerStatusVariant,
  urgencyVariant,
  requestStatusVariant,
} from "../../../utils/chipUtils"

export const getDonorColumns = () => [
  { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 150 },
  { field: "city", headerName: "City", flex: 1, minWidth: 120 },
  { field: "bloodGroup", headerName: "Blood Group", minWidth: 130, flex: 1 },
  {
    field: "offerStatus",
    headerName: "Offer Status",
    minWidth: 130,
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
    headerName: "Offered At",
    minWidth: 150,
    flex: 1,
    valueFormatter: (value) => (value ? formatDate(value) : ""),
  },
]

export const getRequestsColumns = ({ onCancel, onView, loadingRowId }) => [
  { field: "bloodGroup", headerName: "Blood Group", flex: 1, minWidth: 120 },
  { field: "city", headerName: "City", flex: 1.2, minWidth: 120 },
  {
    field: "urgencyLevel",
    headerName: "Urgency",
    flex: 1.2,
    minWidth: 130,
    renderCell: (params) => (
      <Chip variant={urgencyVariant(params.value)}>{params.value}</Chip>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <Chip variant={requestStatusVariant(params.value)}>{params.value}</Chip>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 180,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <ActionCell
        rowId={params.row.id}
        status={params.row.status}
        onCancel={onCancel}
        onView={onView}
        loadingRowId={loadingRowId}
      />
    ),
  },
]
