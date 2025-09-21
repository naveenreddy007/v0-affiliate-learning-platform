import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()

  console.log("[v0] Dashboard: Checking authentication")

  const { data, error } = await supabase.auth.getUser()

  console.log("[v0] Dashboard: Auth result", {
    hasUser: !!data?.user,
    userId: data?.user?.id,
    error: error?.message,
  })

  if (error || !data?.user) {
    console.log("[v0] Dashboard: No user found, redirecting to login")
    redirect("/auth/login")
  }

  console.log("[v0] Dashboard: User authenticated, loading dashboard data")

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

  // Fetch blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(6)

  // Fetch top earners
  const { data: topEarners } = await supabase
    .from("profiles")
    .select("id, full_name, total_earnings, package_type")
    .order("total_earnings", { ascending: false })
    .limit(10)

  // Calculate monthly earnings
  const currentMonth = new Date().toISOString().slice(0, 7)
  const { data: monthlyCommissions } = await supabase
    .from("commissions")
    .select("amount, created_at")
    .eq("to_user_id", data.user.id)
    .gte("created_at", `${currentMonth}-01`)
    .lt("created_at", `${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString()}`)

  return (
    <DashboardContent
      user={data.user}
      profile={profile}
      enrollments={enrollments || []}
      commissions={commissions || []}
      transactions={transactions || []}
      blogPosts={blogPosts || []}
      topEarners={topEarners || []}
      monthlyCommissions={monthlyCommissions || []}
    />
  )
}
