// Simple API client for FastAPI backend
const API_URL = 'http://localhost:8000/api/v1'

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  referral_code?: string
  package_type?: string
  created_at: string
}

export interface LoginData {
  username: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  full_name: string
  phone?: string
  referred_by?: string
}

class API {
  async login(data: LoginData) {
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('password', data.password)

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.detail || 'Login failed')
    }

    const result = await res.json()
    localStorage.setItem('token', result.access_token)
    return result
  }

  async signup(data: SignupData) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.detail || 'Signup failed')
    }

    return res.json()
  }

  async getUser(): Promise<User> {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token')

    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
      throw new Error('Failed to get user')
    }

    return res.json()
  }

  logout() {
    localStorage.removeItem('token')
  }

  isLoggedIn() {
    return !!localStorage.getItem('token')
  }
}

export const api = new API()