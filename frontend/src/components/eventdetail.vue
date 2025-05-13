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

    <button class="rsvpbutton" @click="rsvp">RSVP</button>
    <button class="rsvpbutton" @click="unrsvp">Un-RSVP</button>
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
const unrsvp = async () => {
  try {
    await axios.delete(`/events/${route.params.id}/rsvp`, { withCredentials: true })
    rsvpMsg.value = 'RSVP removed.'
  } catch {
    rsvpMsg.value = 'Failed to remove RSVP.'
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

.rsvpbutton {
  padding: 0.25rem 0.75rem;    /* less vertical & horizontal padding */
  font-size: 0.9rem;           /* a smidge smaller text */
  /* width:auto is default for buttons, so no need to override */
  margin-right: 0.5rem;        /* small gap between them */
}

form {
  display: flex;
  justify-content: flex-start;  
  width: 55%;                   /* same width as your ul, or whatever you need */
  margin: 1rem 0 0 0;      
  gap: 0.5rem; 
  height: 2rem;         
}
form input {
  flex: 1;
  padding: 0.5rem;
  box-sizing: border-box;
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
