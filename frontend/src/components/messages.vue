<template>
  <div class="messages">
    <h2>Chat with {{otherUser.username}}</h2>

    <div class="thread" v-if="thread.length">
      <div 
        v-for="msg in thread" 
        :key="msg.id"
        :class="['bubble', msg.sender_id === user.id ? 'outgoing' : 'incoming']"
      >
        <p>{{ msg.body }}</p>
        <small>{{ formatDate(msg.created_at) }}</small>
      </div>
    </div>
    <p v-else>No messages yet. Say hello!</p>

    <form @submit.prevent="sendMessage" class="send-form">
      <input 
        v-model="newMsg" 
        placeholder="Type your message…" 
        required 
      />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

const route = useRoute()
const otherUserId = route.params.userId

//state
const otherUser = ref({ username: `User ${otherUserId}` }) 
const thread = ref([])
const newMsg = ref('')

const formatDate = iso => new Date(iso).toLocaleString()

const fetchOtherUser = async () => {
  try {
    const { data } = await axios.get(`/users/${otherUserId}`)
    otherUser.value = data
  } catch {
  }
}

const fetchThread = async () => {
  try {
    const { data } = await axios.get(`/users/${otherUserId}/messages`)
    thread.value = data
  } catch (e) {
    console.error('Failed to load messages', e)
  }
}

const sendMessage = async () => {
  if (!newMsg.value) return
  try {
    await axios.post(`/users/${otherUserId}/messages`, {
      body: newMsg.value
    })
    //reload
    await fetchThread()
    newMsg.value = ''
  } catch (e) {
    console.error('Failed to send message', e)
  }
}

onMounted(async () => {
  await fetchOtherUser()
  await fetchThread()
})
</script>

<style scoped>
.messages {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.thread {
  flex: 1;
  max-height: 60vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.bubble {
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 60%;
}
.incoming {
  background: #f0f0f0;
  align-self: flex-start;
}
.outgoing {
  background: #d2f8d2;
  align-self: flex-end;
}
.send-form {
  display: flex;
  gap: 0.5rem;
}
.send-form input {
  padding: 0.5rem;
  height: 60%;
}

.send-form button{
  width: 60px;
}
</style>
