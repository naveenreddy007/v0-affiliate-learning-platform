import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { orderId, paymentId, signature } = await request.json()

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Fetch the order
    const { data: order, error: orderError } = await supabase
      .from("payment_orders")
      .select("*")
      .eq("id", orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const body = orderId + "|" + paymentId
    const expectedSignature = crypto
      .createHmac("sha256", "5TVK1iA2npjluW6vDb0EXIn1")
      .update(body.toString())
      .digest("hex")

    const isPaymentValid = expectedSignature === signature

    if (!isPaymentValid) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    // Update order status
    const { error: updateError } = await supabase
      .from("payment_orders")
      .update({
        status: "completed",
        payment_id: paymentId,
        completed_at: new Date().toISOString(),
      })
      .eq("id", orderId)

    if (updateError) {
      console.error("Order update error:", updateError)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    // Process the signup and commissions
    const signupResponse = await fetch(`${request.nextUrl.origin}/api/commissions/process-signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: order.user_id,
        packageType: order.package_type,
        referralCode: order.referral_code,
      }),
    })

    if (!signupResponse.ok) {
      console.error("Signup processing failed")
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
