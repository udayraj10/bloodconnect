import api from "../../../services/axios"

export const searchByQuery = (query, page, size, signal) => {
  return api.get("/users/search", {
    params: {
      query,
      page,
      size,
    },
    signal,
  })
}

export const getUserById = (id, signal) => {
  return api.get(`/users/${id}`, { signal })
}
