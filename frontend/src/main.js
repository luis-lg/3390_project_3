import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true


const app = createApp(App)
app.use(router)
app.mount('#app')
