import create from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStore = {
  user?: string
  login: (username: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(set => ({
    user: undefined,
    login: (username: string) => {
      set({ user: username })
    },
    logout: () => set({ user: undefined }),
  })),
)
