'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

interface Commission {
  id: string
  amount: number
  referral_name: string
  referral_email: string
  date: string
  status: 'pending' | 'paid'
  level: number
}

interface EarningsStats {
  total_earnings: number
  pending_earnings: number
  paid_earnings: number
  total_referrals: number
  this_month: number
}

export default function EarningsPage() {
  const [stats, setStats] = useState<EarningsStats | null>(null)
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadEarnings() {
      try {
        if (!api.isLoggedIn()) {
          router.push('/auth/login')
          return
        }

        // Mock earnings data
        const mockStats: EarningsStats = {
          total_earnings: 12500,
          pending_earnings: 3200,
          paid_earnings: 9300,
          total_referrals: 15,
          this_month: 4200
        }

        const mockCommissions: Commission[] = [
          {
            id: '1',
            amount: 531,
            referral_name: 'Priya Sharma',
            referral_email: 'priya@example.com',
            date: '2024-12-25',
            status: 'paid',
            level: 1
          },
          {
            id: '2',
            amount: 295,
            referral_name: 'Raj Kumar',
            referral_email: 'raj@example.com',
            date: '2024-12-24',
            status: 'pending',
            level: 1
          },
          {
            id: '3',
            amount: 885,
            referral_name: 'Anita Singh',
            referral_email: 'anita@example.com',
            date: '2024-12-23',
            status: 'paid',
            level: 1
          },
          {
            id: '4',
            amount: 106,
            referral_name: 'Vikram Patel',
            referral_email: 'vikram@example.com',
            date: '2024-12-22',
            status: 'pending',
            level: 2
          }
        ]

        setStats(mockStats)
        setCommissions(mockCommissions)
      } catch (err) {
        console.error('Failed to load earnings:', err)
      } finally {
        setLoading(false)
      }
    }

    loadEarnings()
  }, [router])

  const getStatusColor = (status: string) => {
    return status === 'paid' 
      ? 'text-green-600 bg-green-100' 
      : 'text-yellow-600 bg-yellow-100'
  }

  const getLevelColor = (level: number) => {
    return level === 1 
      ? 'text-blue-600 bg-blue-100' 
      : 'text-purple-600 bg-purple-100'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-300 rounded"></div>
                ))}
              </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <Link href="/dashboard" className="btn btn-secondary text-sm">
            ← Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Earnings</h3>
              <div className="text-2xl font-bold text-green-600">₹{stats.total_earnings.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">All time</div>
            </div>
            
            <div className="card">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Pending</h3>
              <div className="text-2xl font-bold text-yellow-600">₹{stats.pending_earnings.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">Awaiting payment</div>
            </div>
            
            <div className="card">
              <h3 className="text-sm font-medium text-gray-600 mb-1">This Month</h3>
              <div className="text-2xl font-bold text-blue-600">₹{stats.this_month.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">December 2024</div>
            </div>
            
            <div className="card">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Referrals</h3>
              <div className="text-2xl font-bold text-purple-600">{stats.total_referrals}</div>
              <div className="text-xs text-gray-500 mt-1">Active referrals</div>
            </div>
          </div>
        )}

        {/* Commission Structure */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Commission Structure</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-600">Silver Package</div>
              <div className="text-2xl font-bold text-gray-700">₹295</div>
              <div className="text-sm text-gray-500">10% commission</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">Gold Package</div>
              <div className="text-2xl font-bold text-yellow-700">₹531</div>
              <div className="text-sm text-gray-500">10% commission</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">Platinum Package</div>
              <div className="text-2xl font-bold text-purple-700">₹885</div>
              <div className="text-sm text-gray-500">10% commission</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Level 1 (Direct Referrals):</strong> 10% commission</p>
            <p><strong>Level 2 (Sub-referrals):</strong> 2% commission</p>
          </div>
        </div>

        {/* Recent Commissions */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Commissions</h2>
            <button className="btn btn-primary text-sm">
              Request Payout
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Referral</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Level</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((commission) => (
                  <tr key={commission.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {new Date(commission.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-sm">{commission.referral_name}</div>
                        <div className="text-xs text-gray-500">{commission.referral_email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(commission.level)}`}>
                        Level {commission.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-green-600">
                      ₹{commission.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(commission.status)}`}>
                        {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {commissions.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">💰</div>
              <p className="text-gray-600">No commissions yet. Start referring to earn!</p>
            </div>
          )}
        </div>

        {/* Referral Link */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={`${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=ABC123XYZ`}
              readOnly
              className="input flex-1 bg-gray-50"
            />
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(`${window.location.origin}/?ref=ABC123XYZ`)
                  alert('Referral link copied to clipboard!')
                }
              }}
              className="btn btn-primary"
            >
              Copy Link
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Share this link to earn commissions on every signup and purchase.
          </p>
        </div>
      </div>
    </div>
  )
}