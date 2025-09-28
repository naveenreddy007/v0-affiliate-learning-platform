"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { apiClient, type User } from "@/lib/api-client"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          const userData = await apiClient.getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        console.log("Auth check failed:", error)
        apiClient.logout()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    await apiClient.login({ username: email, password })
    const userData = await apiClient.getCurrentUser()
    setUser(userData)
  }

  const logout = () => {
    apiClient.logout()
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}