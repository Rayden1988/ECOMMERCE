import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/guards'
import { setPrimeVue } from './modules/primevue.modules'

if (typeof window !== 'undefined') {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}

const app = createApp(App)
const pinia = createPinia()

setPrimeVue(app)
app.use(pinia)
app.use(router)

app.mount('#app')
