import { useAuthStore } from '@/stores/auth'
export function authenticatedGuard(router: any) {
  router.beforeEach((to: any, from: any, next: any) => {
    const authStore = useAuthStore()

    if (to.meta.auth) {
      if (authStore.isAuth) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })
}
