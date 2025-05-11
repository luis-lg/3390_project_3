<template>
  <div class="home">
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

const city = ref('')
const router = useRouter()

const search = () => {
  if (!city.value) return
  // go to evenlist
  router.push({ name: 'eventlist', query: { city: city.value } })
}
</script>
