import api from "../../../services/axios"

export const loginApi = async (credentials) => {
  return api.post("/auth/login", credentials)
}

export const registerApi = async (data) => {
  return api.post("/auth/register", data)
}
