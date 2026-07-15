import Stack from "@mui/material/Stack"
import AlertInfo from "../components/AlertInfo"
import { Divider } from "@mui/material"
import OffersTable from "../components/OffersTable"

const OfferScreen = () => {
  return (
    <Stack spacing={2} sx={{ mt: 1, mb: 4 }}>
      <AlertInfo />

      <Divider />

      <OffersTable />
    </Stack>
  )
}

export default OfferScreen
