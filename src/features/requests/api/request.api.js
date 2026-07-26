import api from "../../../services/axios"

export const createRequest = (data) => {
  return api.post("/blood-requests/", data)
}

export const getBloodRequest = (id, signal) => {
  return api.get(`/blood-requests/${id}`, { signal })
}

export const getBloodRequests = (page, size, signal) => {
  return api.get("/blood-requests/", {
    params: {
      page,
      size,
    },
    signal,
  })
}

export const cancelRequest = (id) => {
  return api.patch(`/blood-requests/${id}/cancel`)
}

export const getDonors = (id, page, size, signal) => {
  return api.get(`/blood-requests/${id}/donors`, {
    params: {
      page,
      size,
    },
    signal,
  })
}
