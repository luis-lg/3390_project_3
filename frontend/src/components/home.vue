<template>
  <div class="home">
    <img :src="logo" alt="logo" class="logo" />
    <div class="search-overlay">
    <input
      v-model="city"
      @keyup.enter="search"
      placeholder="Search by city"
      class="search-bar"
    />
    <button @click="search">Search</button>
    </div>
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
.home[data-v-f4211ad8]{
  background-color: #fafafa;
  position: relative;
}
.search-overlay {
  position: absolute;
  top: 75%;                /* tweak this % to move up/down over the logo */
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;             /* make sure it sits on top */
}

.home{
  display: block;
  flex-direction: center;
  margin: auto;
  
}
.logo {
  max-width: 575px;
  height: auto;
  margin: auto;
  display: block;
}

input[data-v-f4211ad8]{
  display: inline-block;
  margin-top: 10px;
  width: 50%;
  margin-left: 70px;
  margin-right: 20px;
  border-radius: 5px;
}

input[data-v-f4211ad8]:hover{
  background-color: #fbfbfb;
}

button{
  display: inline-block;
  margin-top: 10px;
  width: 20%;
  margin: auto;
  background-color: #cfa391;
  border-radius: 5px;
}

button:hover{
background:#e1c0b2; 
}

</style>
