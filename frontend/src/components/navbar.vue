<template>
  <nav class="navbar">
    <router-link to="/profile" class="nav-item">Profile</router-link>
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/login" class="nav-item">Login</router-link>
    <button v-if="user" @click="logout" class="nav-item">Logout</button>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// grab current user from localStorage (or null)
const user = ref(JSON.parse(localStorage.getItem('user')))
const router = useRouter()

const logout = () => {
  localStorage.removeItem('user')
  user.value = null
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f2f2f2;
}
.nav-item {
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
