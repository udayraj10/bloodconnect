import api from "../../../services/axios"

export const searchByUsername = (username, signal) => {
  return api.get(`/users/search?name=${username}`, { signal })
}

export const getUserById = (id, signal) => {
  return api.get(`/users/${id}`, { signal })
}
