import api from "../../../services/axios"

export const getStats = (signal) => {
  return api.get("/users/me/stats", { signal })
}
