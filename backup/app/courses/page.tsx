import { redirect } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { CoursesContent } from "@/components/courses/courses-content"
import { cookies } from "next/headers"

export default async function CoursesPage() {
  const { data: user, error } = await apiClient.get("/users/me", {
    headers: { Cookie: cookies().toString() },
  })

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile to check package access
  const { data: profile } = await apiClient.get(`/profiles/${user.id}`, {
    headers: { Cookie: cookies().toString() },
  })

  // Fetch all courses
  const { data: courses } = await apiClient.get("/courses?is_active=true&order_by=order_index", {
    headers: { Cookie: cookies().toString() },
  })

  // Fetch user's enrollments
  const { data: enrollments } = await apiClient.get(`/course_enrollments?user_id=${user.id}`, {
    headers: { Cookie: cookies().toString() },
  })

  return <CoursesContent user={user} profile={profile} courses={courses || []} enrollments={enrollments || []} />
}