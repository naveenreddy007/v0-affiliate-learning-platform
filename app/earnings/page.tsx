import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { EarningsContent } from "@/components/earnings/earnings-content"

export default async function EarningsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Fetch user's commissions
  const { data: commissions } = await supabase
    .from("commissions")
    .select(`
      *,
      from_user:profiles!commissions_from_user_id_fkey(full_name, email)
    `)
    .eq("to_user_id", data.user.id)
    .order("created_at", { ascending: false })

  // Fetch user's transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })

  // Fetch referral statistics
  const { data: directReferrals } = await supabase
    .from("profiles")
    .select("id, full_name, email, package_type, created_at")
    .eq("referred_by", data.user.id)

  // Fetch indirect referrals (people referred by direct referrals)
  const directReferralIds = directReferrals?.map((r) => r.id) || []
  const { data: indirectReferrals } =
    directReferralIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, full_name, email, package_type, created_at")
          .in("referred_by", directReferralIds)
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
