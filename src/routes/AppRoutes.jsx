import { Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage"
import { AuthPage } from "../pages/AuthPage"
import OfferPage from "../pages/OfferPage"
import RequestPage from "../pages/RequestPage"
import DonationPage from "../pages/DonationPage"
import { ProfilePage } from "../pages/ProfilePage"
import StatsPage from "../pages/StatsPage"
import AppLayout from "../components/layout/AppLayout"
import ProtectedRoute from "../components/layout/ProtectedRoute"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/requests" element={<RequestPage />} />

          <Route path="/donations" element={<DonationPage />} />

          <Route path="/offers" element={<OfferPage />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/stats" element={<StatsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
