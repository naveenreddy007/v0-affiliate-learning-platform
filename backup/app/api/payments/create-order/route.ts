import { apiClient } from "@/lib/api-client"
import { type NextRequest, NextResponse } from "next/server"

const Razorpay = require("razorpay")

const razorpay = new Razorpay({
  key_id: "rzp_test_RBrPafmy42Nmd7",
  key_secret: "5TVK1iA2npjluW6vDb0EXIn1",
})

export async function POST(request: NextRequest) {
  try {
    const { packageType, userId } = await request.json()

    if (!packageType || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const packagePrices = {
      silver: 2950,
      gold: 5310,
      platinum: 8850,
    }

    const amount = packagePrices[packageType as keyof typeof packagePrices]
    if (!amount) {
      return NextResponse.json({ error: "Invalid package type" }, { status: 400 })
    }

    const totalAmount = Math.round(amount * 1.18) // 18% GST

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        package_type: packageType,
        user_id: userId,
      },
    })

    // Create payment order record in database
    const { data: order, error } = await apiClient.post("/payment_orders", {
      id: razorpayOrder.id,
      user_id: userId,
      package_type: packageType,
      amount: amount,
      gst: Math.round(amount * 0.18),
      total_amount: totalAmount,
      status: "created",
    })

    if (error) {
      console.error("Error creating payment order:", error)
      return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
    }

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: totalAmount,
      currency: razorpayOrder.currency,
      packageType: packageType,
      key: "rzp_test_RBrPafmy42Nmd7", // Public key for frontend
    })
  } catch (error) {
    console.error("Payment order creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}