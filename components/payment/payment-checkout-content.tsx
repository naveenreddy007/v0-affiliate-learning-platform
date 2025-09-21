"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, CreditCard, Shield, CheckCircle, IndianRupee, Lock, Smartphone, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

interface PaymentCheckoutContentProps {
  user: any
  profile: any
  order: any
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function PaymentCheckoutContent({ user, profile, order }: PaymentCheckoutContentProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => setRazorpayLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast({
        title: "Payment Gateway Loading",
        description: "Please wait while we load the payment gateway",
      })
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageType: order.package_type,
          userId: user.id,
        }),
      })

      const orderData = await response.json()

      if (!response.ok) {
        throw new Error(orderData.error || "Failed to create order")
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: "Raju Learning Platform",
        description: `${order.package_type.charAt(0).toUpperCase() + order.package_type.slice(1)} Package`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })

            if (verifyResponse.ok) {
              toast({
                title: "Payment Successful! 🎉",
                description: "Your package has been activated",
              })
              router.push("/dashboard")
            } else {
              throw new Error("Payment verification failed")
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support",
              variant: "destructive",
            })
          }
        },
        prefill: {
          name: profile?.full_name || "",
          email: user.email,
          contact: profile?.phone || "",
        },
        theme: {
          color: "#e11d48",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  const packageFeatures = {
    silver: ["Access to 15+ courses", "Basic support", "Certificate of completion", "Mobile app access"],
    gold: [
      "Access to 25+ courses",
      "Priority support",
      "Certificate of completion",
      "Mobile app access",
      "Live webinars",
      "Community access",
    ],
    platinum: [
      "Access to 35+ courses",
      "Premium support",
      "Certificate of completion",
      "Mobile app access",
      "Live webinars",
      "Community access",
      "1-on-1 mentoring",
      "Advanced resources",
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </Button>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Raju
            </div>
            <Badge variant="secondary">Checkout</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name || user.email}`} />
              <AvatarFallback>{profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Order ID</span>
                  <span className="font-mono text-sm">{order.id}</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{order.package_type} Package</span>
                    <Badge variant="outline" className="capitalize">
                      {order.package_type}
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    {packageFeatures[order.package_type as keyof typeof packageFeatures].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Package Price</span>
                    <span>₹{order.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GST (18%)</span>
                    <span>₹{Math.round(order.amount * 0.18).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{Math.round(order.amount * 1.18).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Secure Payment</p>
                    <p className="text-sm text-green-600">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Details
                </CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-xs">Card</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "upi" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("upi")}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                      <Smartphone className="w-5 h-5" />
                      <span className="text-xs">UPI</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "wallet" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("wallet")}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                      <Wallet className="w-5 h-5" />
                      <span className="text-xs">Wallet</span>
                    </Button>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="font-mono" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="font-mono" type="password" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" defaultValue={profile?.full_name || ""} />
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@paytm" />
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to your UPI app to complete the payment
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-12 bg-transparent">
                        Paytm Wallet
                      </Button>
                      <Button variant="outline" className="h-12 bg-transparent">
                        PhonePe
                      </Button>
                      <Button variant="outline" className="h-12 bg-transparent">
                        Google Pay
                      </Button>
                      <Button variant="outline" className="h-12 bg-transparent">
                        Amazon Pay
                      </Button>
                    </div>
                  </div>
                )}

                <Separator />

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !razorpayLoaded}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </div>
                  ) : !razorpayLoaded ? (
                    "Loading Payment Gateway..."
                  ) : (
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5" />
                      Pay ₹{Math.round(order.amount * 1.18).toLocaleString()}
                    </div>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
