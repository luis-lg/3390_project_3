<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #d8b09d;">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">ShowMe</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li v-if="!loggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-else class="nav-item">
            <button @click="logout" class="nav-link">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 1. Grab user from localStorage and make it reactive
const stored = localStorage.getItem('user')
const user = ref(stored ? JSON.parse(stored) : null)
const loggedIn = ref(!!user.value)

// 2. Router instance for navigation
const router = useRouter()

// 3. Logout handler: call backend, clear client state, redirect
async function logout() {
  try {
    await axios.post('/users/logout')
  } catch (e) {
    console.warn('Server‐side logout failed:', e)
  }
  localStorage.removeItem('user')
  user.value = null
  loggedIn.value = false
  router.push('/login')
}
</script>

<style>
body{
  background-color: #fafafa;
}
  .navbar-expand-lg .navbar-nav .nav-link {
  background: #cfa391;
  border-radius: 5px;
}

.navbar-expand-lg .navbar-nav .nav-link:hover{
background: #e1c0b2;
}

li.nav-item{
  padding-right: 10px;
}

button.nav-link{
  width: 80px;
}

div.messages{
  background-color: #fafafa;
}

div.bubble.incoming{
  background-color: #aad8f1;
}

form.send-form input{
  height: 30px;
}

</style>