import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Fetch user's courses
  const { data: enrollments } = await supabase
    .from("course_enrollments")
    .select(`
      *,
      courses (*)
    `)
    .eq("user_id", data.user.id)

  // Fetch user's commissions
  const { data: commissions } = await supabase
    .from("commissions")
    .select("*")
    .eq("to_user_id", data.user.id)
    .order("created_at", { ascending: false })

  // Fetch user's transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <DashboardContent
      user={data.user}
      profile={profile}
      enrollments={enrollments || []}
      commissions={commissions || []}
      transactions={transactions || []}
    />
  )
}
