import api from "../../../services/axios"

export const searchByUsername = (username, page, size, signal) => {
  return api.get(`/users/search?name=${username}`, {
    params: {
      page,
      size,
    },
    signal,
  })
}

export const getUserById = (id, signal) => {
  return api.get(`/users/${id}`, { signal })
}
