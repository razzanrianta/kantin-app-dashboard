<script setup lang="ts">
import { reactive } from 'vue'

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
})

function submitRegister() {
  if (!registerForm.username) {
    alert('Username harus ada')
    return
  }
  if (!registerForm.email) {
    alert('Email harus ada')
    return
  }
  if (!registerForm.password) {
    alert('Password harus ada')
    return
  }
  console.log(registerForm)
}
</script>

<template>
  <div>
    <form @submit.prevent="submitRegister">
      <div>
        <label>Username</label>
        <input type="text" v-model="registerForm.username" />
      </div>

      <div>
        <label>Email</label>
        <input type="email" v-model="registerForm.email" />
      </div>

      <div>
        <label>Password</label>
        <input type="password" v-model="registerForm.password" />
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>
