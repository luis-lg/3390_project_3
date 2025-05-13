<template>
  <div class="profile">
    <h2>Welcome, {{ user.username }}</h2>

    <section>
      <h3>Your RSVPs</h3>
      <ul v-if="rsvps.length">
        <li v-for="r in rsvps" :key="r.id">
          {{ r.band }} @ {{ r.venue }} — {{ formatDate(r.date) }}
        </li>
      </ul>
      <p v-else>You have no RSVPs yet.</p>
    </section>

    <section>
      <h3>Your Messages</h3>
      <ul v-if="messages.length">
        <li v-for="m in messages" :key="m.user_id">
          <router-link :to="{ name: 'Messages', params: { userId: m.user_id } }">
            Chat with {{ m.username }} (last at {{ formatDate(m.last_at) }})
          </router-link>
        </li>
      </ul>
      <p v-else>No messages.</p>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const user = ref(JSON.parse(localStorage.getItem('user')) || {})

const rsvps = ref([])
const messages = ref([])

const formatDate = iso => new Date(iso).toLocaleString()

onMounted(async () => {
  try {
    const { data: rv } = await axios.get(`/events/me/myrsvps`,)
    rsvps.value = rv
  } catch {
    rsvps.value = []
  }

  try {
    const { data: msgs } = await axios.get('/users/me/messages')
    messages.value = msgs
  } catch {
    messages.value = []
  }
})
</script>

<style scoped>

.profile { 
  padding: 1rem;
  display: flex;
  flex-direction: column; 
  text-align: center;
  background-color: #fafafa;
}

section { margin-bottom: 1.5rem; }
h3 { 
  margin-bottom: 0.5rem;
  text-decoration: underline;
}

ul { list-style: none; padding: 0; }
li + li { margin-top: 0.5rem; }

a{
border-radius: 5px;
background-color: #f8e0c4;

}

</style>
