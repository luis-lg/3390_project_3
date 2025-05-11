<template>
  <div class="detail">
    <h2>{{ event.band }} @ {{ event.venue }}</h2>
    <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
    <p><strong>Genre:</strong> {{ event.genre }}</p>

    <button @click="rsvp">RSVP</button>
    <p v-if="rsvpMsg">{{ rsvpMsg }}</p>

    <h3>Comments</h3>
    <ul>
      <li v-for="c in comments" :key="c.id">
        {{ c.body }} — <em>{{ formatDate(c.created_at) }}</em>
      </li>
    </ul>

    <form @submit.prevent="addComment">
      <input v-model="newComment" placeholder="Add a comment…" required />
      <button type="submit">Post</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const event = ref({})
const comments = ref([])
const newComment = ref('')
const rsvpMsg = ref('')

const fetchEvent = async () => {
  const res = await axios.get(`/events/${route.params.id}`)
  event.value = res.data
}

const fetchComments = async () => {
  const res = await axios.get(`/events/${route.params.id}/comments`)
  comments.value = res.data
}

const rsvp = async () => {
  try {
    await axios.post(`/events/${route.params.id}/rsvp`)
    rsvpMsg.value = 'RSVP successful!'
  } catch {
    rsvpMsg.value = 'RSVP failed.'
  }
}

const addComment = async () => {
  try {
    const res = await axios.post(`/events/${route.params.id}/comments`, {
      body: newComment.value
    })
    comments.value.push(res.data)
    newComment.value = ''
  } catch {
    // handle error
  }
}

const formatDate = iso => new Date(iso).toLocaleString()

onMounted(async () => {
  await fetchEvent()
  await fetchComments()
})
</script>

<style scoped>
.detail {
  padding: 1rem;
}
button {
  margin-top: 0.5rem;
}
form {
  margin-top: 1rem;
}
</style>
