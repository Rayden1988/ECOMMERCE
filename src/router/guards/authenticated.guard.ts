import { useAuthStore } from '@/stores/auth'
export function authenticatedGuard(router: any) {
  router.beforeEach((to: any) => {
    const authStore = useAuthStore()

    if (to.meta.auth) {
      if (authStore.isAuth) {
        return true
      } else {
        return '/login'
      }
    } else {
      return true
    }
  })
}
