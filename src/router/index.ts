import CustomerLayout from '@/layouts/CustomerLayout.vue'
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProductDetail from '@/views/ProductDetail.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import AdminProducts from '@/views/admin/AdminProducts.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import { authenticatedGuard } from './guards/authenticated.guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/admin',
      component: AdminLayout,
      meta: {
        auth: true,
        role: ['admin'],
      },
      redirect: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'products',
          component: AdminProducts,
        },
      ],
    },
    {
      path: '/',
      component: CustomerLayout,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: 'products',
          component: Products,
        },
        {
          path: 'products/:id',
          component: ProductDetail,
          meta: {
            auth: true,
          },
        },
        {
          path: 'login',
          component: Login,
        },
        {
          path: 'register',
          component: Register,
        },
      ],
    },
  ],
})

authenticatedGuard(router)

export default router
