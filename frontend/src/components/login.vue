<template>
  <form @submit.prevent="doLogin">
    <h2>Log In</h2>
    <div id="use">
      <label>Username</label>
      <input v-model="username" required />
    </div>
    <div id="pass">
      <label>Password</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit">Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const doLogin = async () => {
  try {
    const res = await axios.post('/users/login', {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('user', JSON.stringify(res.data))
    router.push('/')  //redir home
  } catch {
    error.value = 'Login failed'
  }
}
</script>

<style>
h2{
  font-weight: bold;
}
button{
  display: inline-block;
  margin-top: 10px;
  width: 20%;
  margin: auto;
  background-color: #cfa391;
  border-radius: 5px;
}

form{
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
  margin-top: 10px;
  background-color: #fafafa;
  height: 250px;
  border-radius: 45px;
}

#use{
  padding-top: 10px;
  border-radius: 5px;
}

label{
  font-weight: bold;
  padding-right: 3px;
}

#use.label{
  font-weight: bold;
}

#use.input{
  padding-top: 20px;
  margin-top: 10px;
  width: 20%;
}

#pass{
  padding-top: 10px;
  padding-bottom: 10px; 
}

#pass.input{
  margin-top: 10px;
  width: 20%;
}

input{
  border-radius: 5px;
}
</style>