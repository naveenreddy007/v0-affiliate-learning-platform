import { redirect, notFound } from "next/navigation"
import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
import { CourseViewContent } from "@/components/courses/course-view-content"

export default async function CourseViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  // Fetch user profile
  const { data: profile } = await apiClient.get(`/profiles/${user.id}`)

  // Fetch course details
  const { data: course } = await apiClient.get(`/courses/${id}`)

  if (!course) {
    notFound()
  }

  // Check if user has access to this course
  const hasAccess = profile?.package_type && course.package_access.includes(profile.package_type)
  if (!hasAccess) {
    redirect("/courses")
  }

  // Fetch user's enrollment
  const { data: enrollment } = await apiClient.get(`/enrollments?user_id=${user.id}&course_id=${id}`)

  if (!enrollment) {
    redirect("/courses")
  }

  return <CourseViewContent user={user} profile={profile} course={course} enrollment={enrollment} />
}