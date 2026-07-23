export const getDonationData = (stats) => [
  {
    label: "Total Donations",
    value: stats?.totalDonations ?? "-",
    description: "Total number of blood donations made by you",
  },
  {
    label: "Pending Offers",
    value: stats?.pendingOffers ?? "-",
    description: "Number of pending donation offers from you",
  },
  {
    label: "Accepted Offers",
    value: stats?.acceptedOffers ?? "-",
    description: "Number of accepted donation offers from you",
  },
  {
    label: "Completed Offers",
    value: stats?.completedOffers ?? "-",
    description: "Number of completed donation offers from you",
  },
  {
    label: "Declined Offers",
    value: stats?.declinedOffers ?? "-",
    description: "Number of declined donation offers from you",
  },
  {
    label: "Last Donation Date",
    value: stats?.lastDonationDate || "-",
    description: "Last date when you made a blood donation",
  },
]

export const getRequestData = (stats) => [
  {
    label: "Total Requests",
    value: stats?.totalRequestsMade ?? "-",
    description: "Total number of blood requests made by you",
  },
  {
    label: "Open Requests",
    value: stats?.openRequests ?? "-",
    description: "Number of open blood requests from you",
  },
  {
    label: "Fulfilled Requests",
    value: stats?.fulfilledRequests ?? "-",
    description: "Number of fulfilled blood requests from you",
  },
  {
    label: "Cancelled Requests",
    value: stats?.cancelledRequests ?? "-",
    description: "Number of cancelled blood requests from you",
  },
]

export const getOverview = (stats) => [
  { label: "Donations", value: stats?.totalDonations, color: "#e10600" },
  { label: "Requests", value: stats?.totalRequestsMade, color: "#393cf9" },
]

export const getRequestDistribution = (stats) => [
  { label: "Open", value: stats?.openRequests, color: "#393cf9" },
  { label: "Fulfilled", value: stats?.fulfilledRequests, color: "#16a34a" },
  { label: "Cancelled", value: stats?.cancelledRequests, color: "#ed6c02" },
]