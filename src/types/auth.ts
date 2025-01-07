export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto extends LoginDto {
  name: string
} 