import { User } from '@/router/model/user.model'
import { defineStore } from 'pinia'

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_KEY = 'user'

function loadUserFromStorage(): User {
  const raw = localStorage.getItem(USER_KEY)

  if (!raw) return new User()

  try {
    const parsed = JSON.parse(raw) as Partial<User>
    return new User(
      parsed.id ?? '',
      parsed.name ?? '',
      parsed.email ?? '',
      parsed.role ?? 'CUSTOMER',
    )
  } catch {
    return new User()
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: loadUserFromStorage(),
      accessToken: localStorage.getItem(TOKEN_KEY) as string | null,
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) as string | null,
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
      this.user = user
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    setAccessToken(token: string) {
      localStorage.setItem(TOKEN_KEY, token)
      this.accessToken = token
    },

    setRefreshToken(token: string) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token)
      this.refreshToken = token
    },

    logout() {
      this.user = new User()
      this.accessToken = null
      this.refreshToken = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },
  },
})
