"use client"

import type React from "react"

import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const packages = [
  { value: "silver", label: "Silver Package", price: 2950 },
  { value: "gold", label: "Gold Package", price: 5310 },
  { value: "platinum", label: "Platinum Package", price: 8850 },
]

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    packageType: "",
    referralCode: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlReferralCode = searchParams.get("ref")

  useEffect(() => {
    if (urlReferralCode) {
      setFormData((prev) => ({ ...prev, referralCode: urlReferralCode }))
    }
  }, [urlReferralCode])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      await apiClient.signup({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        phone: formData.phone || undefined,
        referred_by: formData.referralCode || undefined,
      })

      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login?message=Account created successfully")
      }, 2000)
      
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPackage = packages.find((pkg) => pkg.value === formData.packageType)

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-muted p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Account Created!</h3>
              <p className="text-muted-foreground">
                Welcome to Raju! You can now sign in to your account.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-muted p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.3 }}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Join Raju
              </CardTitle>
            </motion.div>
            <CardDescription className="text-muted-foreground">
              Start your learning and earning journey today
            </CardDescription>
            {formData.referralCode && (
              <div className="text-sm text-primary font-medium">Referred by: {formData.referralCode}</div>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="h-11 border-border/50 focus:border-primary transition-colors"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="h-11 border-border/50 focus:border-primary transition-colors"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="h-11 border-border/50 focus:border-primary transition-colors"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="referralCode" className="text-sm font-medium">
                  Referral Code (Optional)
                </Label>
                <Input
                  id="referralCode"
                  type="text"
                  placeholder="Enter referral code"
                  value={formData.referralCode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, referralCode: e.target.value }))}
                  className="h-11 border-border/50 focus:border-primary transition-colors"
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="h-11 border-border/50 focus:border-primary transition-colors"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    className="h-11 border-border/50 focus:border-primary transition-colors"
                  />
                </motion.div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Sign in here
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
