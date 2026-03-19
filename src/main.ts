import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setPrimeVue } from './modules/primevue.modules'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
setPrimeVue(app)
app.mount('#app')
