<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue'
import api from '@/api/axios'
import { useRouter } from 'vue-router'
import router from '@/router'

const auth = useAuthStore()

const registerForm = reactive({
  email: '',
  username: '',
  password: '',
})

const error = ref('')
const loading = ref(false)

async function register() {
  loading.value = true
  error.value = ''

  try {
    await api.post('/auth/register', registerForm)
    const loginForm = {
      email: registerForm.email,
      password: registerForm.password,
    }
    const loginResponse = await api.post('/auth/login', loginForm)
    auth.setToken(loginResponse.data.access_token)
    useRouter().push('/merchants')
  } catch (err) {
    error.value = 'Ada kesalahan'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="register">
      <div>
        <label>Email</label>

        <input type="email" v-model="registerForm.email" placeholder="Email" />
      </div>

      <div>
        <label>Username</label>

        <input type="text" v-model="registerForm.username" placeholder="Username" />
      </div>

      <div>
        <label>Password</label>

        <input type="password" v-model="registerForm.password" placeholder="Password" />
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>
