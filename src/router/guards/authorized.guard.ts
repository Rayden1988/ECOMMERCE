import { useAuthStore } from '@/stores/auth'

export function authorizedGuard(router: any) {
  router.beforeEach((to: any, from: any, next: any) => {
    const authStore = useAuthStore()

    if (to.meta.role) {
      if (authStore.getRole && to.meta.role.includes(authStore.getRole)) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })
}
