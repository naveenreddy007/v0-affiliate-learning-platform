"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  TrendingUp,
  Users,
  Wallet,
  Play,
  Award,
  Copy,
  IndianRupee,
  Target,
  Calendar,
  Trophy,
  BookMarked,
  TrendingDown,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface DashboardContentProps {
  user: any
  profile: any
  enrollments: any[]
  commissions: any[]
  transactions: any[]
  blogPosts: any[]
  topEarners: any[]
  monthlyCommissions: any[]
  directReferrals: any[]
  referralEarnings: number
}

export function DashboardContent({
  user,
  profile,
  enrollments,
  commissions,
  transactions,
  blogPosts,
  topEarners,
  monthlyCommissions,
  directReferrals,
  referralEarnings,
}: DashboardContentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  const handleSignOut = async () => {
    setIsLoading(true)
    await logout()
    router.push("/")
  }

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/auth/register?ref=${profile?.referral_code}`
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Referral link copied!",
      description: "Share this link to earn commissions",
    })
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(profile?.referral_code || "")
    toast({
      title: "Referral code copied!",
      description: "Share this code to earn commissions",
    })
  }

  const totalEarnings = commissions.reduce((sum, commission) => sum + Number.parseFloat(commission.amount || 0), 0)
  const pendingEarnings = commissions
    .filter((c) => c.status === "pending")
    .reduce((sum, commission) => sum + Number.parseFloat(commission.amount || 0), 0)
  const completedCourses = enrollments.filter((e) => e.progress === 100).length
  const averageProgress =
    enrollments.length > 0 ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length : 0

  const monthlyEarnings = monthlyCommissions.reduce(
    (sum, commission) => sum + Number.parseFloat(commission.amount || 0),
    0,
  )

  const userRank = topEarners.findIndex((earner) => earner.id === user.id) + 1

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Raju
            </div>
            <Badge variant="secondary">Dashboard</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name || user.email}`} />
              <AvatarFallback>{profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleSignOut} disabled={isLoading}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name || user.email}!</h1>
          <p className="text-muted-foreground">Track your progress, manage your courses, and monitor your earnings.</p>
          {userRank > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">You're ranked #{userRank} among top earners!</span>
            </div>
          )}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">₹{totalEarnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+₹{pendingEarnings.toLocaleString()} pending</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{monthlyEarnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{monthlyCommissions.length} transactions</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrollments.length}</div>
                <p className="text-xs text-muted-foreground">{completedCourses} completed</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(averageProgress)}%</div>
                <Progress value={averageProgress} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Package</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{profile?.package_type || "None"}</div>
                <p className="text-xs text-muted-foreground">
                  {profile?.kyc_status === "verified" ? "KYC Verified" : "KYC Pending"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="leaderboard">Top Earners</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Learning Journey</CardTitle>
                <CardDescription>Continue your courses and track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                {enrollments.length > 0 ? (
                  <div className="grid gap-4">
                    {enrollments.map((enrollment, index) => (
                      <motion.div
                        key={enrollment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{enrollment.courses?.title}</h3>
                            <p className="text-sm text-muted-foreground">{enrollment.courses?.duration} minutes</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">{enrollment.progress}% Complete</div>
                            <Progress value={enrollment.progress} className="w-24 mt-1" />
                          </div>
                          <Button size="sm">{enrollment.progress === 100 ? "Review" : "Continue"}</Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
                    <p className="text-muted-foreground mb-4">Start your learning journey by enrolling in courses</p>
                    <Button>Browse Courses</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commission Summary</CardTitle>
                  <CardDescription>Your affiliate earnings breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Earned</span>
                    <span className="font-semibold text-primary">₹{totalEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month</span>
                    <span className="font-semibold text-green-600">₹{monthlyEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="font-semibold text-yellow-600">₹{pendingEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Available Balance</span>
                    <span className="font-semibold text-green-600">
                      ₹{(profile?.available_balance || 0).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Earnings Breakdown</CardTitle>
                  <CardDescription>Commission types and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {commissions.slice(0, 8).map((commission, index) => (
                      <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              commission.status === "completed"
                                ? "bg-green-500"
                                : commission.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium capitalize">
                              {commission.commission_type?.replace("_", " ")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(commission.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">
                            +₹{Number.parseFloat(commission.amount).toLocaleString()}
                          </p>
                          <Badge
                            variant={commission.status === "completed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {commission.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest earning activities</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((transaction, index) => (
                      <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === "withdrawal"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {transaction.type === "withdrawal" ? (
                              <TrendingDown className="w-4 h-4" />
                            ) : (
                              <TrendingUp className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium capitalize">{transaction.type.replace("_", " ")}</p>
                            <p className="text-xs text-muted-foreground">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-semibold ${
                              transaction.type === "withdrawal" ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {transaction.type === "withdrawal" ? "-" : "+"}₹
                            {Number.parseFloat(transaction.amount).toLocaleString()}
                          </p>
                          <Badge
                            variant={transaction.status === "completed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No transactions yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Share & Earn</CardTitle>
                <CardDescription>Share your referral code and earn commissions when others join</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Your Referral Code</p>
                      <p className="text-2xl font-bold text-primary">{profile?.referral_code}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={copyReferralCode}
                        variant="outline"
                        className="flex items-center gap-2 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </Button>
                      <Button onClick={copyReferralLink} className="flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{directReferrals.length}</p>
                    <p className="text-sm text-muted-foreground">Direct Referrals</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Indirect Referrals</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Wallet className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">₹{referralEarnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Referral Earnings</p>
                  </div>
                </div>

                {directReferrals.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Referrals</CardTitle>
                      <CardDescription>People who joined using your referral code</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {directReferrals.map((referral, index) => (
                          <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${referral.full_name}`}
                                />
                                <AvatarFallback>{referral.full_name?.charAt(0) || "?"}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{referral.full_name || "Anonymous"}</p>
                                <p className="text-xs text-muted-foreground">
                                  Joined {new Date(referral.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs capitalize">
                              {referral.package_type || "Basic"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Latest Blog Posts</CardTitle>
                <CardDescription>Stay updated with the latest insights and tips</CardDescription>
              </CardHeader>
              <CardContent>
                {blogPosts.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        {post.featured_image && (
                          <div className="aspect-video bg-muted">
                            <img
                              src={post.featured_image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                            <Button size="sm" variant="outline">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookMarked className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
                    <p className="text-muted-foreground">Check back later for the latest updates and insights</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Earners Leaderboard</CardTitle>
                <CardDescription>See how you rank among our top performers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEarners.map((earner, index) => (
                    <motion.div
                      key={earner.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        earner.id === user.id ? "bg-primary/5 border-primary/20" : "hover:bg-muted/50"
                      } transition-colors`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0
                              ? "bg-yellow-500 text-white"
                              : index === 1
                                ? "bg-gray-400 text-white"
                                : index === 2
                                  ? "bg-amber-600 text-white"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${earner.full_name}`} />
                          <AvatarFallback>{earner.full_name?.charAt(0) || "?"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{earner.full_name || "Anonymous"}</p>
                          <Badge variant="outline" className="text-xs capitalize">
                            {earner.package_type || "Basic"}
                          </Badge>
                        </div>
                        {earner.id === user.id && (
                          <Badge variant="default" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹{(earner.total_earnings || 0).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total Earnings</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground mt-1">{profile?.full_name || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground mt-1">{profile?.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Package</label>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{profile?.package_type || "None"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">KYC Status</label>
                    <Badge variant={profile?.kyc_status === "verified" ? "default" : "secondary"} className="mt-1">
                      {profile?.kyc_status || "pending"}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}