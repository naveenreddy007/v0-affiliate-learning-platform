'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Raju
            </div>
            <span className="text-sm text-gray-600">Affiliate Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="btn btn-primary text-sm">
              Login
            </Link>
            <Link href="/auth/signup" className="btn btn-secondary text-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            India's #1 Affiliate
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Learning Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn digital marketing, build your skills, and earn through our comprehensive affiliate program. 
            Join thousands of successful affiliates earning ₹10,000+ monthly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn btn-primary text-lg px-8 py-4">
              Start Learning Today
            </Link>
            <Link href="/courses" className="btn btn-secondary text-lg px-8 py-4">
              Explore Courses
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>✅ Free account • ✅ Instant access • ✅ Earn while you learn</p>
          </div>
        </div>

        {/* Package Pricing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Learning Package</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card border-2 border-gray-200 hover:border-gray-400 transition-colors">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Silver Package</h3>
                <div className="text-3xl font-bold text-gray-600 mb-4">
                  ₹2,950
                  <span className="text-lg text-gray-500 font-normal">/lifetime</span>
                </div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>15+ Premium Courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Digital Marketing Basics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Affiliate Marketing Guide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Community Access</span>
                  </li>
                </ul>
                <Link href="/auth/signup" className="btn btn-secondary w-full">
                  Get Silver Package
                </Link>
              </div>
            </div>

            <div className="card border-2 border-yellow-400 hover:border-yellow-500 transition-colors relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Gold Package</h3>
                <div className="text-3xl font-bold text-yellow-600 mb-4">
                  ₹5,310
                  <span className="text-lg text-gray-500 font-normal">/lifetime</span>
                </div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>25+ Premium Courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Advanced SEO Strategies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Social Media Marketing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Email Marketing Automation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>1-on-1 Mentorship</span>
                  </li>
                </ul>
                <Link href="/auth/signup" className="btn btn-primary w-full">
                  Get Gold Package
                </Link>
              </div>
            </div>

            <div className="card border-2 border-purple-400 hover:border-purple-500 transition-colors">
              <div className="text-center">
                <h3 className="text-xl font-bold text-purple-800 mb-2">Platinum Package</h3>
                <div className="text-3xl font-bold text-purple-600 mb-4">
                  ₹8,850
                  <span className="text-lg text-gray-500 font-normal">/lifetime</span>
                </div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>35+ Premium Courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>YouTube Monetization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Dropshipping Business</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Personal Branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>VIP Support & Masterclass</span>
                  </li>
                </ul>
                <Link href="/auth/signup" className="btn btn-primary w-full">
                  Get Platinum Package
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Raju Platform?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-bold mb-2">Expert-Led Courses</h3>
              <p className="text-gray-600 text-sm">Learn from industry experts with real-world experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold mb-2">Earn While Learning</h3>
              <p className="text-gray-600 text-sm">10% commission on direct referrals + 2% on sub-referrals</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-bold mb-2">Mobile-Friendly</h3>
              <p className="text-gray-600 text-sm">Learn anytime, anywhere with our responsive platform</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-bold mb-2">Proven Results</h3>
              <p className="text-gray-600 text-sm">Join 1000+ successful affiliates already earning</p>
            </div>
          </div>
        </div>

        {/* Test Account Info */}
        <div className="card bg-blue-50 border-blue-200 max-w-2xl mx-auto">
          <h3 className="font-bold text-blue-800 mb-3">🧪 Test Account Access</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> admin@raju.com</p>
            <p><strong>Password:</strong> pass123</p>
            <p className="text-blue-700">Use these credentials to explore the platform features!</p>
          </div>
          <div className="mt-4 flex gap-4">
            <Link href="/auth/login" className="btn btn-primary text-sm">
              Test Login
            </Link>
            <Link href="/admin" className="btn btn-secondary text-sm">
              Admin Panel
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600">1,200+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">₹2.8Cr+</div>
              <div className="text-gray-600">Total Earnings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">35+</div>
              <div className="text-gray-600">Premium Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">24.3%</div>
              <div className="text-gray-600">Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">Raju Affiliate Platform</div>
          <p className="text-gray-400 mb-4">Empowering Indian entrepreneurs through digital education</p>
          <div className="flex justify-center gap-8 text-sm">
            <Link href="/courses" className="hover:text-blue-400">Courses</Link>
            <Link href="/earnings" className="hover:text-blue-400">Earnings</Link>
            <Link href="/admin" className="hover:text-blue-400">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}