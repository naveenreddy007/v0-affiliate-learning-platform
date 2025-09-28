'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Raju Affiliate Platform
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          India's #1 affiliate learning platform
        </p>
        
        <div className="space-y-4">
          <div>
            <Link href="/auth/login" className="btn btn-primary mr-4">
              Login
            </Link>
            <Link href="/auth/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Test Account: admin@raju.com / pass123</p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl">
          <div className="card">
            <h3 className="font-semibold mb-2">Silver Package</h3>
            <p className="text-2xl font-bold text-blue-600 mb-2">₹2,950</p>
            <p className="text-sm text-gray-600">Access to 15+ courses</p>
          </div>
          
          <div className="card">
            <h3 className="font-semibold mb-2">Gold Package</h3>
            <p className="text-2xl font-bold text-yellow-600 mb-2">₹5,310</p>
            <p className="text-sm text-gray-600">Access to 25+ courses</p>
          </div>
          
          <div className="card">
            <h3 className="font-semibold mb-2">Platinum Package</h3>
            <p className="text-2xl font-bold text-purple-600 mb-2">₹8,850</p>
            <p className="text-sm text-gray-600">Access to all 35+ courses</p>
          </div>
        </div>
      </div>
    </div>
  )
}