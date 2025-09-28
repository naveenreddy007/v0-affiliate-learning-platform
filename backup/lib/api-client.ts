// API client for FastAPI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export interface LoginData {
  username: string  // FastAPI expects 'username' field for OAuth2PasswordRequestForm
  password: string
}

export interface SignupData {
  email: string
  password: string
  full_name: string
  phone?: string
  referred_by?: string
}

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  is_active: boolean
  is_verified: boolean
  referral_code?: string
  package_type?: string
  created_at: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
  }

  // Helper method to get auth headers
  private getAuthHeaders(): Headers {
    // The browser will automatically send the auth cookie, so no need to manually set it.
    return new Headers({
      "Content-Type": "application/json",
    });
  }

  // Login user
  async login(credentials: LoginData): Promise<AuthResponse> {
    const loginUrl = `${this.baseUrl}/auth/login`
    console.log('🔧 API Client: Attempting login to:', loginUrl)
    console.log('🔧 Base URL:', this.baseUrl)
    
    const formData = new FormData()
    formData.append('username', credentials.username)
    formData.append('password', credentials.password)

    const response = await fetch(loginUrl, {
      method: 'POST',
      body: formData,
    })

    console.log('🔧 API Response:', response.status, response.url)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Login failed')
    }

    const data = await response.json()
    
    // Store token in localStorage
    localStorage.setItem('access_token', data.access_token)
    console.log('✅ Token stored successfully')
    
    return data
  }

  // Register user
  async signup(userData: SignupData): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Signup failed')
    }

    return await response.json()
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to get user data')
    }

    return await response.json()
  }

  // Logout user
  async logout(): Promise<void> {
    await fetch(`/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "logout" }),
    });
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    // This will be handled by the AuthProvider, which checks for the presence of the user object.
    return false;
  }

  // Get courses
  async getCourses() {
    const response = await fetch(`${this.baseUrl}/courses/`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch courses')
    }

    return await response.json()
  }
}

export const apiClient = new ApiClient()