'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

interface Course {
  id: string
  title: string
  description: string
  required_package: string
  difficulty_level: string
  duration_minutes: number
  tags: string[]
  content: {
    modules: {
      title: string
      lessons: {
        title: string
        duration: number
        completed?: boolean
      }[]
    }[]
  }
}

export default function CourseDetailPage() {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeModule, setActiveModule] = useState(0)
  const [enrolled, setEnrolled] = useState(false)
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string

  useEffect(() => {
    async function loadCourse() {
      try {
        if (!api.isLoggedIn()) {
          router.push('/auth/login')
          return
        }

        // Mock course data based on ID
        const courseMap: Record<string, Course> = {
          '1': {
            id: '1',
            title: 'Digital Marketing Fundamentals',
            description: 'Master the fundamentals of digital marketing. This comprehensive course covers SEO, social media marketing, content strategy, and analytics. Perfect for beginners looking to start their digital marketing journey.',
            required_package: 'silver',
            difficulty_level: 'beginner',
            duration_minutes: 120,
            tags: ['digital marketing', 'seo', 'social media'],
            content: {
              modules: [
                {
                  title: 'Introduction to Digital Marketing',
                  lessons: [
                    { title: 'What is Digital Marketing?', duration: 15 },
                    { title: 'Digital Marketing Landscape', duration: 20 },
                    { title: 'Setting Goals & KPIs', duration: 25 }
                  ]
                },
                {
                  title: 'Search Engine Optimization (SEO)',
                  lessons: [
                    { title: 'SEO Basics', duration: 30 },
                    { title: 'Keyword Research', duration: 25 },
                    { title: 'On-Page Optimization', duration: 35 }
                  ]
                }
              ]
            }
          },
          '2': {
            id: '2',
            title: 'Affiliate Marketing 101',
            description: 'Learn how to start and scale your affiliate marketing business. From choosing the right products to promoting them effectively, this course covers everything you need to know.',
            required_package: 'silver',
            difficulty_level: 'beginner',
            duration_minutes: 90,
            tags: ['affiliate marketing', 'commissions', 'passive income'],
            content: {
              modules: [
                {
                  title: 'Affiliate Marketing Basics',
                  lessons: [
                    { title: 'Understanding Affiliate Marketing', duration: 15 },
                    { title: 'Choosing Affiliate Programs', duration: 20 },
                    { title: 'Commission Structures', duration: 15 }
                  ]
                },
                {
                  title: 'Promotion Strategies',
                  lessons: [
                    { title: 'Content Marketing for Affiliates', duration: 25 },
                    { title: 'Social Media Promotion', duration: 15 }
                  ]
                }
              ]
            }
          }
        }

        const mockCourse = courseMap[courseId] || courseMap['1']
        setCourse(mockCourse)
        setEnrolled(true)
      } catch (err) {
        console.error('Failed to load course:', err)
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [courseId, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-2">Course Not Found</h2>
          <Link href="/courses" className="btn btn-primary">Back to Courses</Link>
        </div>
      </div>
    )
  }

  const totalLessons = course.content.modules.reduce((total, module) => total + module.lessons.length, 0)
  const totalDuration = course.content.modules.reduce(
    (total, module) => total + module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0), 0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/courses" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Courses
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">About This Course</h2>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totalDuration}</div>
                  <div className="text-sm text-gray-600">Total Minutes</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{course.content.modules.length}</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{totalLessons}</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>
              <div className="space-y-4">
                {course.content.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setActiveModule(activeModule === moduleIndex ? -1 : moduleIndex)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{module.title}</h3>
                        <span className="text-sm text-gray-500">
                          {activeModule === moduleIndex ? '▼' : '▶'} {module.lessons.length} lessons
                        </span>
                      </div>
                    </button>
                    
                    {activeModule === moduleIndex && (
                      <div className="px-4 pb-4 space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                            <span className="text-sm">{lesson.title}</span>
                            <span className="text-xs text-gray-500">{lesson.duration}min</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              {enrolled ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span className="font-medium text-green-800">Enrolled</span>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary w-full">
                    Continue Learning
                  </button>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">25% Complete</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <button className="btn btn-primary w-full">
                    Enroll Now
                  </button>
                  <div className="text-xs text-gray-500 text-center">
                    Requires {course.required_package} package
                  </div>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="font-semibold mb-3">Course Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium capitalize">{course.difficulty_level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{totalDuration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium capitalize">{course.required_package}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Tags:</div>
                <div className="flex flex-wrap gap-1">
                  {course.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}