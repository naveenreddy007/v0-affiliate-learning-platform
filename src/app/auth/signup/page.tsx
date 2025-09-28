'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referred_by: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      console.log('🔧 Creating account...')
      await api.signup({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        referred_by: formData.referred_by || undefined,
      })
      console.log('✅ Account created')
      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 2000)
    } catch (err) {
      console.error('❌ Signup failed:', err)
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card w-full max-w-md text-center">
          <div className="text-green-600 text-4xl mb-4">✅</div>
          <h2 className="text-xl font-bold mb-2">Account Created!</h2>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Referral Code (Optional)</label>
            <input
              type="text"
              value={formData.referred_by}
              onChange={(e) => setFormData(prev => ({ ...prev, referred_by: e.target.value }))}
              className="input"
              placeholder="Enter referral code"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Confirm</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="input"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-gray-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}