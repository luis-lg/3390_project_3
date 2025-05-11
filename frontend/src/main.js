import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// point axios at your backend
axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true


const app = createApp(App)
app.use(router)
app.mount('#app')
