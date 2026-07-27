import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react"
import { getProfile } from "../features/profile/api/profile.api"
import { getErrorMessage } from "../utils/getErrorMessage"

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

  const fetchProfile = useCallback(async (authToken) => {
    const res = await getProfile(authToken)

    if (res.status === 200) setUser(res.data?.data ?? null)
  }, [])

  useEffect(() => {
    async function initialize() {
      setLoading(true)
      setError("")
      const storedToken = localStorage.getItem("token")

      if (!storedToken) {
        setToken(null)
        setUser(null)
        setLoading(false)
        return
      }

      setToken(storedToken)

      try {
        await fetchProfile(storedToken)
      } catch (err) {
        setError(getErrorMessage(err))
        console.error("Profile fetch failed during initialization:", err)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [fetchProfile])

  const refreshUser = useCallback(async () => {
    const currentToken = token || localStorage.getItem("token")
    if (!currentToken) return

    try {
      await fetchProfile(currentToken)
    } catch (e) {
      console.error("Failed to refresh user profile:", e)
    }
  }, [token, fetchProfile])

  const login = async (newToken) => {
    if (!newToken) return
    setToken(newToken)
    localStorage.setItem("token", newToken)

    try {
      await fetchProfile(newToken)
    } catch (error) {
      console.error("login profile fetch failed:", error)
      logout()
    }
  }

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token,
      refreshUser,
      loading,
      error,
    }),
    [user, token, login, logout, refreshUser, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}
