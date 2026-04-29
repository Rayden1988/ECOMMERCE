import { useAuthStore } from '@/stores/auth'

export function authorizedGuard(router: any) {
  router.beforeEach((to: any) => {
    const authStore = useAuthStore()

    if (to.meta.role) {
      if (authStore.getRole && to.meta.role.includes(authStore.getRole)) {
        return true
      } else {
        return '/login'
      }
    } else {
      return true
    }
  })
}
