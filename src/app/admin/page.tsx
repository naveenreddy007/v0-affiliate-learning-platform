'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

interface AdminStats {
  total_users: number
  total_revenue: number
  pending_commissions: number
  courses_completed: number
  new_signups_today: number
  active_users: number
}

interface User {
  id: string
  full_name: string
  email: string
  package_type: string | null
  created_at: string
  is_active: boolean
  total_earnings: number
  referrals_count: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  useEffect(() => {
    async function loadAdminData() {
      try {
        if (!api.isLoggedIn()) {
          router.push('/auth/login')
          return
        }

        // Check if user is admin (in real app, check user role)
        // For demo, we'll allow anyone to access admin

        // Mock admin stats
        const mockStats: AdminStats = {
          total_users: 1247,
          total_revenue: 2845600,
          pending_commissions: 89400,
          courses_completed: 3892,
          new_signups_today: 23,
          active_users: 892
        }

        // Mock users data
        const mockUsers: User[] = [
          {
            id: '1',
            full_name: 'Raju Admin',
            email: 'admin@raju.com',
            package_type: 'platinum',
            created_at: '2024-01-15T10:00:00Z',
            is_active: true,
            total_earnings: 45600,
            referrals_count: 12
          },
          {
            id: '2',
            full_name: 'Priya Sharma',
            email: 'priya@example.com',
            package_type: 'gold',
            created_at: '2024-11-20T14:30:00Z',
            is_active: true,
            total_earnings: 8900,
            referrals_count: 5
          },
          {
            id: '3',
            full_name: 'Rajesh Kumar',
            email: 'rajesh@example.com',
            package_type: 'silver',
            created_at: '2024-12-10T09:15:00Z',
            is_active: true,
            total_earnings: 2300,
            referrals_count: 2
          },
          {
            id: '4',
            full_name: 'Anita Singh',
            email: 'anita@example.com',
            package_type: null,
            created_at: '2024-12-25T16:45:00Z',
            is_active: true,
            total_earnings: 0,
            referrals_count: 0
          }
        ]

        setStats(mockStats)
        setUsers(mockUsers)
      } catch (err) {
        console.error('Failed to load admin data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadAdminData()
  }, [router])

  const getPackageColor = (pkg: string | null) => {
    switch (pkg) {
      case 'silver': return 'text-gray-600 bg-gray-100'
      case 'gold': return 'text-yellow-600 bg-yellow-100'
      case 'platinum': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-400 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
              Admin Only
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="btn btn-secondary text-sm">
              ← User Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'users', label: 'Users' },
                { id: 'revenue', label: 'Revenue' },
                { id: 'courses', label: 'Courses' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Users</h3>
                <div className="text-2xl font-bold text-blue-600">{stats.total_users.toLocaleString()}</div>
                <div className="text-xs text-green-600 mt-1">↗ +{stats.new_signups_today} today</div>
              </div>
              
              <div className="card">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
                <div className="text-2xl font-bold text-green-600">₹{stats.total_revenue.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">All time</div>
              </div>
              
              <div className="card">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Pending Commissions</h3>
                <div className="text-2xl font-bold text-yellow-600">₹{stats.pending_commissions.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">To be paid</div>
              </div>
              
              <div className="card">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Active Users</h3>
                <div className="text-2xl font-bold text-purple-600">{stats.active_users.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
              </div>
              
              <div className="card">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Courses Completed</h3>
                <div className="text-2xl font-bold text-indigo-600">{stats.courses_completed.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Total completions</div>
              </div>
              
              <div className="card">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</h3>
                <div className="text-2xl font-bold text-pink-600">24.3%</div>
                <div className="text-xs text-green-600 mt-1">↗ +2.1% this month</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <button className="btn btn-primary text-sm">
                  📊 Generate Report
                </button>
                <button className="btn btn-secondary text-sm">
                  💸 Process Payouts
                </button>
                <button className="btn btn-secondary text-sm">
                  📧 Send Newsletter
                </button>
                <button className="btn btn-secondary text-sm">
                  🎯 Create Campaign
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Management</h2>
              <button className="btn btn-primary text-sm">
                Add New User
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Package</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Earnings</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Referrals</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-sm">{user.full_name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPackageColor(user.package_type)}`}>
                          {user.package_type ? user.package_type.charAt(0).toUpperCase() + user.package_type.slice(1) : 'No Package'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium text-green-600">
                        ₹{user.total_earnings.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {user.referrals_count}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          user.is_active ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                        }`}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-xs">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-800 text-xs">
                            Suspend
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Revenue Analytics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">₹28,45,600</div>
                  <div className="text-sm text-gray-600 mt-1">Total Revenue</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">₹4,22,100</div>
                  <div className="text-sm text-gray-600 mt-1">This Month</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">₹89,400</div>
                  <div className="text-sm text-gray-600 mt-1">Pending Payouts</div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Revenue by Package</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Silver Package (₹2,950)</div>
                    <div className="text-sm text-gray-600">423 sales</div>
                  </div>
                  <div className="text-xl font-bold text-gray-700">₹12,47,850</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium">Gold Package (₹5,310)</div>
                    <div className="text-sm text-gray-600">189 sales</div>
                  </div>
                  <div className="text-xl font-bold text-yellow-700">₹10,03,590</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-medium">Platinum Package (₹8,850)</div>
                    <div className="text-sm text-gray-600">67 sales</div>
                  </div>
                  <div className="text-xl font-bold text-purple-700">₹5,92,950</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Course Management</h2>
              <button className="btn btn-primary text-sm">
                Add New Course
              </button>
            </div>
            
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📚</div>
              <p className="text-gray-600">Course management coming soon...</p>
              <p className="text-sm text-gray-500 mt-2">
                Features: Add courses, manage content, track completion rates
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}