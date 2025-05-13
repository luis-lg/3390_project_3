<template>
  
  <div class="event-list">
    <h2>Results for "{{ city }}"</h2>
    <div v-if="events.length">
      <div
        v-for="e in events"
        :key="e.id"
        class="card"
      > 
        <img
          class="placeholder"
          :src="mech"
          alt="Event placeholder"
        />
        <router-link :to="{ name: 'eventdetail', params: { id: e.id } }">
          <h3>{{ e.band }}</h3>
          <p>{{ e.venue }} — {{ formatDate(e.date) }}</p>
          <p><small>{{ e.genre }}</small></p>
        </router-link>
      </div>
    </div>
    <p v-else>No events found for "{{ city }}".</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import mech from '../assets/mech1.png'

const route = useRoute()
const city = route.query.city || ''
const events = ref([])

const fetchEvents = async () => {
  try {
    const res = await axios.get(`/events/search?city=${city}`)
    events.value = res.data
  } catch (e) {
    console.error('Search failed', e)
    events.value = []
  }
}

const formatDate = iso => new Date(iso).toLocaleDateString()

onMounted(fetchEvents)
</script>

<style scoped>
.event-list {
  padding: 1rem;
  background-color: #fafafa;
}
.card {
  display: block;
  padding: 2px 10px;
  margin-right: 20px;
  margin-bottom: 0.5rem;
  border: 1px solid #d67c2e;
  background-color: #f1c4b1;

}
.card h3 {
  margin: 0;
  text-decoration: none;
}

p{
  color: black;
  text-decoration: none;
}

a{
  color:black;
  text-decoration: none;
}
.placeholder {
  width: 100px;
  height: auto;      /* preserves aspect ratio */
}
</style>