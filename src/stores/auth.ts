import { User } from '@/router/model/user.model'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }

    return {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : new User(),
      accessToken: localStorage.getItem('accessToken') as string | null,
      refreshToken: undefined as string | undefined,
    }
  },

  getters: {
    getUser(state) {
      return state.user
    },

    getEmail(state) {
      return state.user?.email ?? 'No email'
    },

    getRole(state): 'ADMIN' | 'CUSTOMER' | null {
      return state.user?.role ?? null
    },

    isAuth(state): boolean {
      return !!state.accessToken
    },
  },

  actions: {
    setUser(user: User) {
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
    },

    setAccessToken(token: string) {
      localStorage.removeItem('token')
      localStorage.setItem('accessToken', token)
      this.accessToken = token
    },

    setRefreshToken(token: string) {
      this.refreshToken = token
    },

    logout() {
      this.user = new User()
      this.accessToken = null
      this.refreshToken = undefined
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('token')
    },
  },
})
