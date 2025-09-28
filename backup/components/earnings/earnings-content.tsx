"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Users,
  Wallet,
  ArrowLeft,
  IndianRupee,
  Calendar,
  Share2,
  Copy,
  Download,
  Filter,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

interface EarningsContentProps {
  user: any
  profile: any
  commissions: any[]
  transactions: any[]
  directReferrals: any[]
  indirectReferrals: any[]
}

export function EarningsContent({
  user,
  profile,
  commissions,
  transactions,
  directReferrals,
  indirectReferrals,
}: EarningsContentProps) {
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  const handleSignOut = async () => {
    await logout()
    router.push("/")
  }

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/auth/signup?ref=${profile?.referral_code}`
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Referral link copied!",
      description: "Share this link to earn commissions",
    })
  }

  // Calculate earnings statistics
  const totalEarnings = commissions.reduce((sum, commission) => sum + Number.parseFloat(commission.amount || 0), 0)
  const pendingEarnings = commissions
    .filter((c) => c.status === "pending")
    .reduce((sum, commission) => sum + Number.parseFloat(commission.amount || 0), 0)
  const paidEarnings = commissions
    .filter((c) => c.status === "paid")
    .reduce((sum, commission) => sum + Number.parseFloat(commission.amount || 0), 0)
  const directCommissions = commissions.filter((c) => c.commission_type === "direct")
  const indirectCommissions = commissions.filter((c) => c.commission_type === "indirect")

  // Monthly earnings calculation
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlyEarnings = commissions
    .filter((c) => {
      const commissionDate = new Date(c.created_at)
      return commissionDate.getMonth() === currentMonth && commissionDate.getFullYear() === currentYear
    })
    .reduce((sum, commission) => sum + Number.parseFloat(commission.amount || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
            </Button>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Raju
            </div>
            <Badge variant="secondary">Earnings</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name || user.email}`} />
              <AvatarFallback>{profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Earnings Dashboard</h1>
          <p className="text-muted-foreground">Track your commissions, referrals, and financial performance</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">₹{totalEarnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All-time earnings</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{monthlyEarnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Current month earnings</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Direct Referrals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{directReferrals.length}</div>
                <p className="text-xs text-muted-foreground">People you referred</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ₹{(profile?.available_balance || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Ready for withdrawal</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Referral Link Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Your Referral Link
              </CardTitle>
              <CardDescription>Share this link to earn commissions when others join</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1 p-3 bg-background rounded-lg border">
                  <p className="text-sm font-mono text-muted-foreground">
                    {typeof window !== "undefined"
                      ? `${window.location.origin}/auth/signup?ref=${profile?.referral_code}`
                      : ""}
                  </p>
                </div>
                <Button onClick={copyReferralLink} className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Your referral code: <span className="font-bold text-primary">{profile?.referral_code}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="commissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Commissions Tab */}
          <TabsContent value="commissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Commission History</h2>
              <div className="flex items-center gap-4">
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Direct Commissions</CardTitle>
                  <CardDescription>Earnings from your direct referrals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">
                    ₹{directCommissions.reduce((sum, c) => sum + Number.parseFloat(c.amount), 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {directCommissions.length} commission{directCommissions.length !== 1 ? "s" : ""}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Indirect Commissions</CardTitle>
                  <CardDescription>Earnings from second-level referrals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary mb-2">
                    ₹{indirectCommissions.reduce((sum, c) => sum + Number.parseFloat(c.amount), 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {indirectCommissions.length} commission{indirectCommissions.length !== 1 ? "s" : ""}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Commissions</CardTitle>
              </CardHeader>
              <CardContent>
                {commissions.length > 0 ? (
                  <div className="space-y-4">
                    {commissions.slice(0, 10).map((commission, index) => (
                      <motion.div
                        key={commission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              commission.commission_type === "direct" ? "bg-primary" : "bg-secondary"
                            }`}
                          />
                          <div>
                            <p className="font-medium capitalize">{commission.commission_type} Commission</p>
                            <p className="text-sm text-muted-foreground">
                              From {commission.from_user?.full_name || commission.from_user?.email || "Unknown"} •{" "}
                              {commission.package_type} package
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(commission.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            +₹{Number.parseFloat(commission.amount).toLocaleString()}
                          </p>
                          <Badge variant={commission.status === "paid" ? "default" : "secondary"}>
                            {commission.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No commissions yet</h3>
                    <p className="text-muted-foreground mb-4">Start referring people to earn your first commission</p>
                    <Button onClick={copyReferralLink}>Share Referral Link</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Direct Referrals ({directReferrals.length})</CardTitle>
                  <CardDescription>People you directly referred</CardDescription>
                </CardHeader>
                <CardContent>
                  {directReferrals.length > 0 ? (
                    <div className="space-y-3">
                      {directReferrals.map((referral, index) => (
                        <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{referral.full_name || referral.email}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(referral.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {referral.package_type || "No package"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No direct referrals yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Indirect Referrals ({indirectReferrals.length})</CardTitle>
                  <CardDescription>People referred by your referrals</CardDescription>
                </CardHeader>
                <CardContent>
                  {indirectReferrals.length > 0 ? (
                    <div className="space-y-3">
                      {indirectReferrals.map((referral, index) => (
                        <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{referral.full_name || referral.email}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(referral.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {referral.package_type || "No package"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No indirect referrals yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>All your financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.slice(0, 15).map((transaction, index) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium capitalize">{transaction.type.replace("_", " ")}</p>
                          <p className="text-sm text-muted-foreground">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === "withdrawal"
                                ? "text-red-600"
                                : transaction.type === "commission_earned"
                                  ? "text-green-600"
                                  : "text-blue-600"
                            }`}
                          >
                            {transaction.type === "withdrawal" ? "-" : "+"}₹
                            {Number.parseFloat(transaction.amount).toLocaleString()}
                          </p>
                          <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{directReferrals.length > 0 ? "100%" : "0%"}</div>
                  <p className="text-sm text-muted-foreground">Referrals who purchased packages</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Commission</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">
                    ₹{commissions.length > 0 ? Math.round(totalEarnings / commissions.length).toLocaleString() : "0"}
                  </div>
                  <p className="text-sm text-muted-foreground">Per successful referral</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+0%</div>
                  <p className="text-sm text-muted-foreground">Month over month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}