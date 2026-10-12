<script setup lang="ts">
import { reactive, ref } from 'vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()

const loginForm = reactive({
  email: '',
  password: '',
})
const router = useRouter()

const error = ref('')
const loading = ref(false)

async function login() {
  loading.value = true
  error.value = ''
  try {
    const response = await api.post('/auth/login', loginForm)
    auth.setToken(response.data.access_token)
    await auth.fetchUser()
    router.push('/merchants')
  } catch (err) {
    error.value = 'Email atau password salah'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center bg-[#f6f7f2] px-5 py-8 font-sans text-[#252b24]"
  >
    <section
      class="w-full max-w-[400px] rounded-xl border border-[#e8ebe4] bg-white p-7 shadow-[0_8px_30px_rgba(30,50,25,0.05)] sm:p-9"
    >
      <!-- Brand -->
      <div class="mb-9 flex items-center gap-3">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#285b3d] text-lg font-bold text-white"
        >
          K
        </div>
        <span class="text-xl font-bold tracking-tight">Kantin</span>
      </div>

      <!-- Heading -->
      <div class="mb-7">
        <h1 class="mb-2 text-2xl font-semibold tracking-tight sm:text-[27px]">Selamat datang!</h1>
        <p class="text-sm leading-relaxed text-[#777d74]">Masuk untuk melanjutkan ke kantin.</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="login" class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label for="email" class="text-[13px] font-semibold"> Email </label>
          <input
            id="email"
            v-model="loginForm.email"
            type="email"
            placeholder="nama@email.com"
            autocomplete="email"
            required
            class="w-full rounded-md border border-[#dfe3da] bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#a1a69e] focus:border-[#39754d] focus:ring-2 focus:ring-[#39754d]/10"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="password" class="text-[13px] font-semibold"> Password </label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            placeholder="Masukkan password"
            autocomplete="current-password"
            required
            class="w-full rounded-md border border-[#dfe3da] bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#a1a69e] focus:border-[#39754d] focus:ring-2 focus:ring-[#39754d]/10"
          />
        </div>

        <p v-if="error" class="text-sm text-red-600" role="alert">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="mt-0.5 w-full rounded-md bg-[#285b3d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#204a31] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ loading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>
      <p class="mt-5 text-center text-sm text-[#777d74]">
        Belum punya akun?
        <RouterLink
          to="/register"
          class="font-semibold text-[#285b3d] transition hover:text-[#204a31] hover:underline"
        >
          Daftar
        </RouterLink>
      </p>
    </section>
  </main>
</template>

<style>
.red-text {
  color: red;
}
</style>
