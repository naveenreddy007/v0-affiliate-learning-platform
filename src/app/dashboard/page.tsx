'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api, type User } from '@/lib/api'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        if (!api.isLoggedIn()) {
          router.push('/auth/login')
          return
        }

        console.log('🔧 Loading user data...')
        const userData = await api.getUser()
        console.log('✅ User loaded:', userData)
        setUser(userData)
      } catch (err) {
        console.error('❌ Failed to load user:', err)
        setError('Failed to load user data')
        api.logout()
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [router])

  function handleLogout() {
    api.logout()
    console.log('✅ User logged out')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md text-center">
          <div className="text-red-600 text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={() => router.push('/auth/login')} className="btn btn-primary">
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Raju Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.full_name}
            </span>
            <button onClick={handleLogout} className="btn btn-secondary text-sm">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* User Profile Card */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <p className="font-medium">{user.full_name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <p className="font-medium">{user.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Referral Code</label>
              <p className="font-mono font-medium">{user.referral_code}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Package</label>
              <p className="font-medium capitalize">
                {user.package_type || 'No package selected'}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Member Since</label>
              <p className="font-medium">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="font-semibold text-gray-600 mb-2">Available Courses</h3>
            <p className="text-2xl font-bold text-blue-600">9</p>
            <p className="text-sm text-gray-500">Based on your package</p>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-gray-600 mb-2">Completed</h3>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">Start learning today</p>
          </div>
          
          <div className="card">
            <h3 className="font-semibold text-gray-600 mb-2">Earnings</h3>
            <p className="text-2xl font-bold text-purple-600">₹0</p>
            <p className="text-sm text-gray-500">Affiliate commissions</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/courses" className="btn btn-primary text-left p-4 h-auto">
              <div>
                <div className="font-medium">📚 Browse Courses</div>
                <div className="text-sm opacity-75">Explore available content</div>
              </div>
            </Link>
            
            <Link href="/earnings" className="btn btn-secondary text-left p-4 h-auto">
              <div>
                <div className="font-medium">💰 View Earnings</div>
                <div className="text-sm opacity-75">Check your commissions</div>
              </div>
            </Link>
            
            <button 
              onClick={() => {
                const referralLink = `${window.location.origin}/?ref=${user.referral_code}`
                navigator.clipboard.writeText(referralLink)
                alert('Referral link copied to clipboard!')
              }}
              className="btn btn-secondary text-left p-4 h-auto"
            >
              <div>
                <div className="font-medium">🔗 Share Referral Link</div>
                <div className="text-sm opacity-75">Earn commissions</div>
              </div>
            </button>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mt-8 card bg-green-50 border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-green-800">
              ✅ Backend Connected - FastAPI + PostgreSQL
            </span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            Authentication working • Database connected • Ready for development
          </p>
        </div>
      </div>
    </div>
  )
}