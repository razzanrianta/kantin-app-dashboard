<script setup lang="ts">
import { reactive, ref } from 'vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const loginForm = reactive({
  email: '',
  password: '',
})

const error = ref('')
const loading = ref(false)

async function login() {
  loading.value = true
  error.value = ''
  try {
    const response = await api.post('/auth/login', loginForm)
    auth.setToken(response.data.access_token)
    console.log('Login Success')
  } catch (err) {
    error.value = 'Email atau password salah'
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login">
      <div>
        <label>Email</label>

        <input type="email" v-model="loginForm.email" placeholder="Email" />
      </div>

      <div>
        <label>Password</label>

        <input type="password" v-model="loginForm.password" placeholder="Password" />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>
