import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  token: string | null
  user: User | null
  setAuth: (token: string, user: User) => void
  logout: () => void
}

type AuthStore = (
  set: (
    partial: AuthState | Partial<AuthState> | ((state: AuthState) => AuthState | Partial<AuthState>),
    replace?: boolean | undefined
  ) => void
) => AuthState

export const useAuthStore = create<AuthState>()(
  persist(
    ((set) => ({
      token: null,
      user: null,
      setAuth: (token: string, user: User) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    })) as AuthStore,
    {
      name: 'auth-storage',
    }
  )
) 