"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { apiClient } from "@/lib/api-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, TrendingUp, DollarSign, Activity, UserCheck, BarChart3, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  created_at: string
  user_metadata: {
    email: string
  }
}

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  coursesCompleted: number
}

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    coursesCompleted: 0,
  })
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    } else if (user) {
      apiClient.setToken(user.token)
      loadStats()
    }
  }, [user, loading, router])

  const loadStats = async () => {
    // Mock data for now - replace with actual database queries
    setStats({
      totalUsers: 1247,
      activeUsers: 892,
      totalRevenue: 2850000,
      coursesCompleted: 3456,
    })
  }

  const handleSignOut = async () => {
    await logout()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Raju Admin
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <Activity className="w-3 h-3 mr-1" />
              Live Dashboard
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-muted-foreground">Welcome, {user.email}</div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+23%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.coursesCompleted.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest user activities and system events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "New user registration", user: "priya.sharma@email.com", time: "2 minutes ago" },
                    { action: "Course completion", user: "rajesh.kumar@email.com", time: "15 minutes ago" },
                    { action: "Payment received", user: "anita.patel@email.com", time: "1 hour ago" },
                    { action: "New user registration", user: "vikram.singh@email.com", time: "2 hours ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.time}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Course Completion Rate</span>
                      <span className="text-sm text-green-600">94%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">User Satisfaction</span>
                      <span className="text-sm text-blue-600">4.8/5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Revenue Growth</span>
                      <span className="text-sm text-purple-600">+23%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage and monitor user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground mb-4">User management features will be implemented here</p>
                  <Button variant="outline">View All Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Manage courses and learning content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Course Management</h3>
                  <p className="text-muted-foreground mb-4">Course management features will be implemented here</p>
                  <Button variant="outline">Manage Courses</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">System Settings</h3>
                  <p className="text-muted-foreground mb-4">System configuration options will be available here</p>
                  <Button variant="outline">Configure Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}