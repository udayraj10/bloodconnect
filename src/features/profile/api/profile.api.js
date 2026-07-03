import api from "../../../services/axios"

export const getProfile = (token) => {
  return api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateProfile = (data) => {
  return api.patch("/users/me", data)
}

export const changePassword = (data) => {
  return api.patch("/users/me/password", data)
}

export const deactivate = () => {
  return api.patch("/users/me/deactivate")
}

export const getStats = () => {
  return api.get("/users/me/stats")
}

export const searchByUsername = (username) => {
  return api.get(`/users/search?name=${username}`)
}
