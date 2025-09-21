import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CoursesContent } from "@/components/courses/courses-content"

export default async function CoursesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile to check package access
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Fetch all courses
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true })

  // Fetch user's enrollments
  const { data: enrollments } = await supabase.from("course_enrollments").select("*").eq("user_id", data.user.id)

  return <CoursesContent user={data.user} profile={profile} courses={courses || []} enrollments={enrollments || []} />
}
