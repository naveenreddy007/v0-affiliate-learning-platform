import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CourseViewContent } from "@/components/courses/course-view-content"

export default async function CourseViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Fetch course details
  const { data: course } = await supabase.from("courses").select("*").eq("id", id).eq("is_active", true).single()

  if (!course) {
    notFound()
  }

  // Check if user has access to this course
  const hasAccess = profile?.package_type && course.package_access.includes(profile.package_type)
  if (!hasAccess) {
    redirect("/courses")
  }

  // Fetch user's enrollment
  const { data: enrollment } = await supabase
    .from("course_enrollments")
    .select("*")
    .eq("user_id", data.user.id)
    .eq("course_id", id)
    .single()

  if (!enrollment) {
    redirect("/courses")
  }

  return <CourseViewContent user={data.user} profile={profile} course={course} enrollment={enrollment} />
}
