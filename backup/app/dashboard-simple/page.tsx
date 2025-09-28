"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient, type User } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { User as UserIcon, BookOpen, TrendingUp, LogOut, Award, Calendar } from "lucide-react"

export default function SimpleDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        if (!apiClient.isAuthenticated()) {
          router.push("/auth/login")
          return
        }

        // Get current user
        const userData = await apiClient.getCurrentUser()
        setUser(userData)

        // Get courses (will show placeholder if not implemented)
        try {
          const coursesData = await apiClient.getCourses()
          setCourses(coursesData)
        } catch (err) {
          console.log("Courses endpoint not ready yet")
          setCourses([])
        }

      } catch (error) {
        console.error("Dashboard load error:", error)
        setError("Failed to load dashboard")
        apiClient.logout()
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [router])

  const handleLogout = () => {
    apiClient.logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-muted">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-muted">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => router.push("/auth/login")}>
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-muted/50">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Raju Dashboard
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {user?.package_type || "No Package"}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              Welcome, {user?.full_name}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user?.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user?.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Referral Code</p>
                  <p className="font-medium font-mono">{user?.referral_code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Package</p>
                  <Badge variant={user?.package_type ? "default" : "secondary"}>
                    {user?.package_type || "No Package Selected"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(user?.created_at || "").toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9</div>
              <p className="text-xs text-muted-foreground">Based on your package</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Start learning today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹0</div>
              <p className="text-xs text-muted-foreground">Affiliate commissions</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get started with your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  className="h-auto p-4 flex-col gap-2" 
                  variant="outline"
                  onClick={() => router.push("/courses")}
                >
                  <BookOpen className="w-6 h-6" />
                  <div>
                    <div className="font-medium">Browse Courses</div>
                    <div className="text-xs text-muted-foreground">
                      Explore available learning content
                    </div>
                  </div>
                </Button>
                
                <Button 
                  className="h-auto p-4 flex-col gap-2" 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/?ref=${user?.referral_code}`)
                    alert("Referral link copied to clipboard!")
                  }}
                >
                  <TrendingUp className="w-6 h-6" />
                  <div>
                    <div className="font-medium">Share Referral Link</div>
                    <div className="text-xs text-muted-foreground">
                      Earn commissions from referrals
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 dark:text-green-300 font-medium">
                  ✅ Backend Connected - FastAPI + PostgreSQL
                </span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Authentication working • Database connected • API ready
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}