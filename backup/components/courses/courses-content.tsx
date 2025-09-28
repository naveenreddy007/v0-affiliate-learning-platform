"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Play, Clock, Award, Search, Filter, Star, CheckCircle, Lock, ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

interface CoursesContentProps {
  user: any
  profile: any
  courses: any[]
  enrollments: any[]
}

export function CoursesContent({ user, profile, courses, enrollments }: CoursesContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [isEnrolling, setIsEnrolling] = useState<string | null>(null)
  const router = useRouter()
  const { logout } = useAuth()

  const handleSignOut = async () => {
    await logout()
    router.push("/")
  }

  const handleEnrollment = async (courseId: string) => {
    setIsEnrolling(courseId)

    try {
      const { error } = await apiClient.post("/course_enrollments", {
        user_id: user.id,
        course_id: courseId,
        progress: 0,
      })

      if (error) throw error

      toast({
        title: "Enrolled successfully!",
        description: "You can now start learning this course",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Enrollment failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsEnrolling(null)
    }
  }

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e) => e.course_id === courseId)
  }

  const getEnrollmentProgress = (courseId: string) => {
    const enrollment = enrollments.find((e) => e.course_id === courseId)
    return enrollment?.progress || 0
  }

  const hasAccess = (course: any) => {
    if (!profile?.package_type) return false
    return course.package_access.includes(profile.package_type)
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterBy === "enrolled") {
      return matchesSearch && isEnrolled(course.id)
    } else if (filterBy === "available") {
      return matchesSearch && hasAccess(course) && !isEnrolled(course.id)
    } else if (filterBy === "locked") {
      return matchesSearch && !hasAccess(course)
    }

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
            </Button>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Raju
            </div>
            <Badge variant="secondary">Courses</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name || user.email}`} />
              <AvatarFallback>{profile?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Library</h1>
          <p className="text-muted-foreground">
            Explore our comprehensive collection of courses designed to help you succeed
          </p>
        </motion.div>

        {/* Package Info */}
        {profile?.package_type && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold capitalize">{profile.package_type} Package</p>
                      <p className="text-sm text-muted-foreground">
                        Access to{" "}
                        {profile.package_type === "silver" ? "15+" : profile.package_type === "gold" ? "25+" : "35+"}{" "}
                        courses
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="enrolled">Enrolled</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => {
            const enrolled = isEnrolled(course.id)
            const progress = getEnrollmentProgress(course.id)
            const hasAccessToCourse = hasAccess(course)

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  className={`h-full hover:shadow-lg transition-all duration-300 ${
                    enrolled ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
                      <img
                        src={course.thumbnail_url || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-t-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                          e.currentTarget.nextElementSibling!.style.display = "flex"
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center">
                        <Play className="w-12 h-12 text-primary" />
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {enrolled && (
                        <Badge className="bg-primary text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Enrolled
                        </Badge>
                      )}
                      {!hasAccessToCourse && (
                        <Badge variant="secondary" className="bg-muted">
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        4.8
                      </div>
                    </div>

                    {/* Package Access Info */}
                    <div className="flex flex-wrap gap-1">
                      {course.package_access.map((pkg: string) => (
                        <Badge
                          key={pkg}
                          variant="outline"
                          className={`text-xs ${profile?.package_type === pkg ? "border-primary text-primary" : ""}`}
                        >
                          {pkg}
                        </Badge>
                      ))}
                    </div>

                    {/* Progress Bar for Enrolled Courses */}
                    {enrolled && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} />
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2">
                      {enrolled ? (
                        <Button className="w-full" asChild>
                          <Link href={`/courses/${course.id}`}>
                            {progress === 100 ? "Review Course" : "Continue Learning"}
                          </Link>
                        </Button>
                      ) : hasAccessToCourse ? (
                        <Button
                          className="w-full"
                          onClick={() => handleEnrollment(course.id)}
                          disabled={isEnrolling === course.id}
                        >
                          {isEnrolling === course.id ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Enrolling...
                            </div>
                          ) : (
                            "Enroll Now"
                          )}
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full bg-transparent" disabled>
                          <Lock className="w-4 h-4 mr-2" />
                          Upgrade Package
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "No courses match your current filter"}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}