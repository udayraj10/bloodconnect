import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"
import { getProfile } from "../features/profile/api/profile.api"
import { getErrorMessage } from "../utils/getErrorMessage"
import { set } from "react-hook-form"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
        const res = await getProfile(storedToken)
        if (res.status === 200) setUser(res.data?.data ?? null)
        setError("")
      } catch (err) {
        setError(getErrorMessage(err))
        console.error("Profile fetch failed during initialization:", error)
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
      const res = await getProfile(currentToken)
      if (res.status === 200) setUser(res.data?.data ?? null)
    } catch (e) {
      console.error("Failed to refresh user profile:", e)
    }
  }

  const login = async (newToken) => {
    if (!newToken) return
    setToken(newToken)
    localStorage.setItem("token", newToken)

    try {
      const res = await getProfile(newToken)
      if (res.status === 200) setUser(res.data?.data ?? null)
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
    loading,
    error,
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
