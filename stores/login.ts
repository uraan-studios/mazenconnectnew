import { create } from 'zustand'

interface LoginStore {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
}

export const useLoginStore = create<LoginStore>((set) => ({
  email: '',
  password: '',
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
}))