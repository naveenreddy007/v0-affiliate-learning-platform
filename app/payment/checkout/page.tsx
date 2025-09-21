import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PaymentCheckoutContent } from "@/components/payment/payment-checkout-content"

export default async function PaymentCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>
}) {
  const { orderId } = await searchParams

  if (!orderId) {
    notFound()
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch order details
  const { data: order } = await supabase
    .from("payment_orders")
    .select("*")
    .eq("id", orderId)
    .eq("user_id", data.user.id)
    .single()

  if (!order) {
    notFound()
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return <PaymentCheckoutContent user={data.user} profile={profile} order={order} />
}
