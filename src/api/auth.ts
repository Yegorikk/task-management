import { LoginDto, RegisterDto, AuthResponse } from '../types/auth'
import { config } from '../config/env'

export const authApi = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await fetch(`${config.AUTH_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    return response.json()
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await fetch(`${config.AUTH_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Registration failed')
    }

    return response.json()
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
} 