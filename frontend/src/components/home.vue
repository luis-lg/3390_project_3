<template>
  <div class="home">
    <img :src="logo" alt="logo" class="logo" />
    <input
      v-model="city"
      @keyup.enter="search"
      placeholder="Search by city (e.g. Bakersfield)"
    />
    <button @click="search">Search</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/showmelogo.png'

const city = ref('')
const router = useRouter()

const search = () => {
  if (!city.value) return
  // go to evenlist
  router.push({ name: 'eventlist', query: { city: city.value } })
}
</script>

<style scoped>
 body{
  background-color: #d8b09d;
  background: #d8b09d;
}

.home{
  display: flex;
  flex-direction: column;
  
}
.logo {
  max-width: 300px;
  height: auto;
  margin: center;
}
</style>
