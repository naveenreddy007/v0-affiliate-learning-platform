'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

interface Course {
  id: string
  title: string
  description: string
  short_description: string
  required_package: string
  difficulty_level: string
  duration_minutes: number
  is_featured: boolean
  tags: string[]
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const router = useRouter()

  useEffect(() => {
    async function loadCourses() {
      try {
        if (!api.isLoggedIn()) {
          router.push('/auth/login')
          return
        }

        // Mock courses data
        const mockCourses: Course[] = [
          {
            id: '1',
            title: 'Digital Marketing Fundamentals',
            description: 'Master the basics of digital marketing including SEO, social media, and content marketing.',
            short_description: 'Learn digital marketing basics',
            required_package: 'silver',
            difficulty_level: 'beginner',
            duration_minutes: 120,
            is_featured: true,
            tags: ['digital marketing', 'seo', 'social media']
          },
          {
            id: '2', 
            title: 'Affiliate Marketing 101',
            description: 'Complete guide to starting your affiliate marketing journey and earning your first commission.',
            short_description: 'Start your affiliate marketing journey',
            required_package: 'silver',
            difficulty_level: 'beginner',
            duration_minutes: 90,
            is_featured: false,
            tags: ['affiliate marketing', 'commissions', 'beginner']
          },
          {
            id: '3',
            title: 'Advanced SEO Strategies',
            description: 'Advanced SEO techniques to rank #1 on Google and drive organic traffic.',
            short_description: 'Advanced SEO techniques',
            required_package: 'gold',
            difficulty_level: 'advanced',
            duration_minutes: 180,
            is_featured: true,
            tags: ['seo', 'advanced', 'google ranking']
          },
          {
            id: '4',
            title: 'YouTube Channel Monetization',
            description: 'Complete guide to building and monetizing a successful YouTube channel.',
            short_description: 'YouTube monetization mastery',
            required_package: 'platinum',
            difficulty_level: 'advanced',
            duration_minutes: 250,
            is_featured: true,
            tags: ['youtube', 'monetization', 'video marketing']
          },
          {
            id: '5',
            title: 'Facebook & Instagram Marketing',
            description: 'Complete social media marketing course for Facebook and Instagram advertising.',
            short_description: 'Social media marketing mastery',
            required_package: 'gold',
            difficulty_level: 'intermediate',
            duration_minutes: 200,
            is_featured: false,
            tags: ['facebook', 'instagram', 'social media']
          },
          {
            id: '6',
            title: 'Email Marketing Automation',
            description: 'Build automated email sequences that sell while you sleep.',
            short_description: 'Automated email marketing',
            required_package: 'gold',
            difficulty_level: 'intermediate',
            duration_minutes: 130,
            is_featured: false,
            tags: ['email marketing', 'automation', 'sales']
          }
        ]

        setCourses(mockCourses)
      } catch (err) {
        console.error('Failed to load courses:', err)
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [router])

  const filteredCourses = courses.filter(course => 
    filter === 'all' || course.required_package === filter
  )

  const getPackageColor = (pkg: string) => {
    switch (pkg) {
      case 'silver': return 'text-gray-600 bg-gray-100'
      case 'gold': return 'text-yellow-600 bg-yellow-100'
      case 'platinum': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-blue-600 bg-blue-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <Link href="/dashboard" className="btn btn-secondary text-sm">
            ← Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter by Package</h2>
          <div className="flex flex-wrap gap-2">
            {['all', 'silver', 'gold', 'platinum'].map((pkg) => (
              <button
                key={pkg}
                onClick={() => setFilter(pkg)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === pkg
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {pkg === 'all' ? 'All Courses' : `${pkg.charAt(0).toUpperCase() + pkg.slice(1)} Package`}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {error ? (
          <div className="card text-center">
            <div className="text-red-600 text-4xl mb-4">❌</div>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link 
                key={course.id} 
                href={`/courses/${course.id}`}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
              >
                {course.is_featured && (
                  <div className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded mb-2">
                    Featured
                  </div>
                )}
                
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.short_description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPackageColor(course.required_package)}`}>
                    {course.required_package.charAt(0).toUpperCase() + course.required_package.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(course.difficulty_level)}`}>
                    {course.difficulty_level.charAt(0).toUpperCase() + course.difficulty_level.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>⏱️ {course.duration_minutes} minutes</span>
                  <span>→</span>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && !error && (
          <div className="card text-center">
            <div className="text-gray-400 text-4xl mb-4">📚</div>
            <p className="text-gray-600">No courses found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}