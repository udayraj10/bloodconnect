import { useEffect } from "react"
import { Routes, Route, useLocation, matchPath } from "react-router-dom"
import { AuthPage } from "../pages/AuthPage"
import { OfferPage } from "../pages/OfferPage"
import { OfferDetailsPage } from "../pages/OfferDetailsPage"
import { RequestPage } from "../pages/RequestPage"
import { BloodRequestDetails } from "../pages/BloodRequestDetails"
import { ProfilePage } from "../pages/ProfilePage"
import { StatsPage } from "../pages/StatsPage"
import { SearchPage } from "../pages/SearchPage"
import { UserProfilePage } from "../pages/UserProfilePage"
import NotFound from "../pages/NotFound"
import AppLayout from "../components/layout/AppLayout"
import ProtectedRoute from "../components/layout/ProtectedRoute"

const titleConfig = [
  { path: "/", title: "Home" },
  { path: "/auth", title: "Authentication" },
  { path: "/requests", title: "Requests" },
  { path: "/requests/:id", title: "Requests Details" },
  { path: "/offers", title: "Offers" },
  { path: "/offers/:id", title: "Offers Details" },
  { path: "/profile", title: "Profile" },
  { path: "/search", title: "Search" },
  { path: "/search/:id", title: "User Profile" },
  { path: "/stats", title: "Stats" },
  { path: "*", title: "Page Not Found" },
]

function PageTitleUpdater() {
  const location = useLocation()

  useEffect(() => {
    const activeRoute = titleConfig.find((route) =>
      matchPath({ path: route.path, end: true }, location.pathname),
    )

    const title = activeRoute?.title
    document.title = title ? `${title} | Blood Connect` : "Blood Connect"
  }, [location])

  return null
}

const AppRoutes = () => {
  return (
    <>
      <PageTitleUpdater />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<StatsPage />} />
            <Route path="/requests" element={<RequestPage />} />
            <Route path="/requests/:id" element={<BloodRequestDetails />} />
            <Route path="/offers" element={<OfferPage />} />
            <Route path="/offers/:id" element={<OfferDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:id" element={<UserProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
