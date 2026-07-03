import { createContext, useContext, useEffect, useState } from "react"
import { getProfile } from "../features/profile/api/profile.api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initialize() {
      const storedToken = localStorage.getItem("token")

      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        setToken(storedToken)
        const { data } = await getProfile(storedToken)
        setUser(data.data)
      } catch (e) {
        console.error("useEffect profile fetch failed:", e)
        logout()
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [])

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
    setLoading(true)
    setToken(newToken)
    localStorage.setItem("token", newToken)

    try {
      const res = await getProfile(newToken)
      setUser(res.data.data)
    } catch (error) {
      console.error("login profile fetch failed:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    setLoading(false)
  }

  const values = {
    user,
    token,
    loading,
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
