import { redirect } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { EarningsContent } from "@/components/earnings/earnings-content"
import { cookies } from "next/headers"

export default async function EarningsPage() {
  const { data: user, error } = await apiClient.get("/users/me", {
    headers: { Cookie: cookies().toString() },
  })

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await apiClient.get(`/profiles/${user.id}`, {
    headers: { Cookie: cookies().toString() },
  })

  // Fetch user's commissions
  const { data: commissions } = await apiClient.get(`/commissions?to_user_id=${user.id}`, {
    headers: { Cookie: cookies().toString() },
  })

  // Fetch user's transactions
  const { data: transactions } = await apiClient.get(`/transactions?user_id=${user.id}`, {
    headers: { Cookie: cookies().toString() },
  })

  // Fetch referral statistics
  const { data: directReferrals } = await apiClient.get(`/profiles?referred_by=${user.id}`, {
    headers: { Cookie: cookies().toString() },
  })

  // Fetch indirect referrals (people referred by direct referrals)
  const directReferralIds = directReferrals?.map((r: any) => r.id) || []
  const { data: indirectReferrals } = directReferralIds.length
    ? await apiClient.get(`/profiles?referred_by_in=${directReferralIds.join(",")}`, {
        headers: { Cookie: cookies().toString() },
      })
    : { data: [] }

  return (
    <EarningsContent
      user={data.user}
      profile={profile}
      commissions={commissions || []}
      transactions={transactions || []}
      directReferrals={directReferrals || []}
      indirectReferrals={indirectReferrals || []}
    />
  )
}