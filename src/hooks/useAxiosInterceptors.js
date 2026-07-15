import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../services/axios"

export function useAxiosInterceptors() {
  const { logout } = useAuth()

  useEffect(() => {
    if (api.interceptorsInitialized) {
      return
    }
    api.interceptorsInitialized = true

    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token")
            logout()
          }
        }

        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.response.eject(responseInterceptor)

      api.interceptorsInitialized = false
    }
  }, [logout])
}
