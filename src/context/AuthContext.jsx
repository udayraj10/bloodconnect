import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"
import { getProfile } from "../features/profile/api/profile.api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  )
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
  }, [])

  useEffect(() => {
    async function initialize() {
      setLoading(true)
      const storedToken = localStorage.getItem("token")

      if (!storedToken) {
        setToken(null)
        setUser(null)
        setLoading(false)
        return
      }

      setToken(storedToken)

      try {
        const { data } = await getProfile(storedToken)
        setUser(data?.data ?? null)
      } catch (error) {
        const status = error?.response?.status

        if (status === 401 || status === 403) {
          logout()
        } else {
          console.warn("Profile fetch failed during initialization:", error)
        }
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [logout])

  const refreshUser = async () => {
    const currentToken = token || localStorage.getItem("token")
    if (!currentToken) return

    try {
      const { data } = await getProfile(currentToken)
      setUser(data.data)
    } catch (e) {
      console.error("Failed to refresh user profile:", e)
    }
  }

  const login = async (newToken) => {
    setToken(newToken)
    localStorage.setItem("token", newToken)

    try {
      const res = await getProfile(newToken)
      setUser(res.data.data)
    } catch (error) {
      console.error("login profile fetch failed:", error)
      logout()
    }
  }

  const values = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    refreshUser,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}
