<template>
  <div class="event-list">
    <h2>Results for "{{ city }}"</h2>
    <div v-if="events.length">
      <div
        v-for="e in events"
        :key="e.id"
        class="card"
      >
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
}
.card {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
}
.card h3 {
  margin: 0;
}
</style>
