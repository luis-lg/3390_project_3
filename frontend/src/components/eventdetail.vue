<template>
  <div v-if="event" class="detail">

    <h2>{{ event.band }} </h2>
    <img
      class="venue"
      :src="'http://localhost:5000/images/' + event.image_url"
      alt="venue logo"
    />
    <p>{{ event.venue }} — {{ formatDate(event.date) }}</p>
    <p><small>{{ event.genre }}</small></p>

    <button @click="rsvp">RSVP</button>
    <p v-if="rsvpMsg">{{ rsvpMsg }}</p>

    <h3>Comments</h3>
    <ul>
      <li v-for="c in comments" :key="c.id" class = "comments">
        <strong>{{ c.username }}</strong>:
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
import mech from '../assets/mech1.png'


const route = useRoute()
const event = ref([])
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
  background-color: #fafafa;
}

.detail img{
  float: right;
  width: 40%;
  height: 20%;
  width: 250px;
  height: auto;
  cursor: default !important;
}

button {
  margin-top: 0.5rem;
}

form {
  margin-top: 1rem;
}

h2{
text-decoration: underline;
}

#date{
  background-color: #bd8d7a;
  width: 230px;
  border-radius: 5px;
}


#gen{
  background-color: #bd8d7a;
  width: 100px;
  border-radius: 5px;
}

h3{
  text-decoration: underline;
}

ul{
  border-radius: 5px;
  background-color: #aad8f1;
  width: 55%;
}
.comments{
  border-bottom: 1px solid #000; 
  padding-bottom: 0.5rem;    
  margin-bottom: 0.5rem;  
}

</style>
