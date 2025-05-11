<template>
  <form @submit.prevent="doLogin">
    <h2>Log In</h2>
    <div>
      <label>Username</label>
      <input v-model="username" required />
    </div>
    <div>
      <label>Password</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit">Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const doLogin = async () => {
  try {
    const res = await axios.post('/users/login', {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('user', JSON.stringify(res.data))
    router.push('/')  //redir home
  } catch {
    error.value = 'Login failed'
  }
}
</script>