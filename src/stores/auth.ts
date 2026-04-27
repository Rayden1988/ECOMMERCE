import { User } from '@/router/model/user.model'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : new User(),
      accessToken: localStorage.getItem('token') as string | null,
      refreshToken: null as null | string,
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
      localStorage.setItem('token', token)
      this.accessToken = token
    },

    setRefreshToken(token: string) {
      this.refreshToken = token
    },

    logout() {
      this.user = new User()
      this.accessToken = null
      this.refreshToken = null
      localStorage.removeItem('token')
    },
  },
})
