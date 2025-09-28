"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Settings,
  Maximize,
  Clock,
  Award,
  CheckCircle,
  BookOpen,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

interface CourseViewContentProps {
  user: any
  profile: any
  course: any
  enrollment: any
}

export function CourseViewContent({ user, profile, course, enrollment }: CourseViewContentProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(enrollment.progress)
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  const handleSignOut = async () => {
    await logout()
    router.push("/")
  }

  const updateProgress = async (newProgress: number) => {
    setIsUpdatingProgress(true)

    try {
      await apiClient.patch(`/enrollments/${enrollment.id}`, {
        progress: newProgress,
        completed_at: newProgress === 100 ? new Date().toISOString() : null,
      })

      setCurrentProgress(newProgress)

      if (newProgress === 100) {
        toast({
          title: "Congratulations! 🎉",
          description: "You've completed this course!",
        })
      }
    } catch (error) {
      toast({
        title: "Failed to update progress",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingProgress(false)
    }
  }

  const markAsComplete = () => {
    updateProgress(100)
  }

  const simulateProgress = () => {
    // Simulate watching progress
    const newProgress = Math.min(currentProgress + 25, 100)
    updateProgress(newProgress)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/courses" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Link>
            </Button>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Raju
            </div>
            <Badge variant="secondary">Learning</Badge>
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden">
                <div className="aspect-video bg-black relative group">
                  {/* Video Player Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-medium">Video Player</p>
                      <p className="text-sm opacity-80">Click to start learning</p>
                    </div>
                  </div>

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <div className="flex-1" />
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Course Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{course.title}</CardTitle>
                      <CardDescription className="text-base">{course.description}</CardDescription>
                    </div>
                    <Badge variant={currentProgress === 100 ? "default" : "secondary"}>
                      {currentProgress === 100 ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {course.duration} minutes
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {course.package_access.join(", ")} access
                    </div>
                  </div>

                  <Separator />

                  {/* Progress Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Your Progress</h3>
                      <span className="text-sm text-muted-foreground">{currentProgress}% Complete</span>
                    </div>
                    <Progress value={currentProgress} className="h-3" />

                    <div className="flex gap-3">
                      <Button
                        onClick={simulateProgress}
                        disabled={isUpdatingProgress || currentProgress === 100}
                        className="flex-1"
                      >
                        {isUpdatingProgress ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Updating...
                          </div>
                        ) : currentProgress === 100 ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          "Continue Learning"
                        )}
                      </Button>

                      {currentProgress < 100 && (
                        <Button variant="outline" onClick={markAsComplete} disabled={isUpdatingProgress}>
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.duration} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="font-medium">{currentProgress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={currentProgress === 100 ? "default" : "secondary"}>
                      {currentProgress === 100 ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  {currentProgress === 100 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <span className="font-medium">
                        {enrollment.completed_at ? new Date(enrollment.completed_at).toLocaleDateString() : "Today"}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Certificate */}
            {currentProgress === 100 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Congratulations! You've completed this course and earned a certificate.
                    </p>
                    <Button className="w-full bg-transparent" variant="outline">
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Related Courses */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Continue Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Explore more courses to expand your knowledge</p>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/courses">Browse All Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}