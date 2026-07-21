import api from "../../../services/axios"

export const getOffers = (page, size, signal) => {
  return api.get("/offers/", {
    params: {
      page,
      size,
    },
    signal,
  })
}

export const getOffer = (id, signal) => {
  return api.get(`/offers/${id}`, { signal })
}

export const acceptOffer = (id) => {
  return api.patch(`/offers/${id}/accept`)
}

export const completeOffer = (id) => {
  return api.patch(`/offers/${id}/complete`)
}

export const declineOffer = (id) => {
  return api.patch(`/offers/${id}/decline`)
}
