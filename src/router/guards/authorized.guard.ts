import type { RouteLocationNormalized } from 'vue-router'

export function authorizedGuard(to: RouteLocationNormalized, role: string): boolean {
  const allowedRoles = (to.meta.role as string[] | undefined) ?? []

  if (allowedRoles.length === 0) {
    return true
  }

  return allowedRoles.includes(role)
}
