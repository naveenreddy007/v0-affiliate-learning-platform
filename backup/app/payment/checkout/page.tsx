import { redirect, notFound } from "next/navigation"
import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
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

  const cookieStore = cookies()
  const token = cookieStore.get("access_token")?.value

  if (!token) {
    redirect("/auth/login")
  }

  apiClient.setToken(token)

  const { data: user } = await apiClient.get("/users/me")
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch order details
  const { data: order } = await apiClient.get(`/payment_orders/${orderId}?user_id=${user.id}`)

  if (!order) {
    notFound()
  }

  // Fetch user profile
  const { data: profile } = await apiClient.get(`/profiles/${user.id}`)

  return <PaymentCheckoutContent user={user} profile={profile} order={order} />
}