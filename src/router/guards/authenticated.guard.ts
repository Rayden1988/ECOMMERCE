import type { Router } from 'vue-router'

export function authenticatedGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    next()
  })
}
