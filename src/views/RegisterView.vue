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
        <h1 class="mb-2 text-2xl font-semibold tracking-tight sm:text-[27px]">Buat akun baru</h1>
        <p class="text-sm leading-relaxed text-[#777d74]">
          Daftar untuk mulai menggunakan layanan kantin.
        </p>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="register" class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label for="email" class="text-[13px] font-semibold"> Email </label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            placeholder="nama@email.com"
            autocomplete="email"
            required
            class="w-full rounded-md border border-[#dfe3da] bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#a1a69e] focus:border-[#39754d] focus:ring-2 focus:ring-[#39754d]/10"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="username" class="text-[13px] font-semibold"> Username </label>
          <input
            id="username"
            v-model="registerForm.username"
            type="text"
            placeholder="Pilih username"
            autocomplete="username"
            required
            class="w-full rounded-md border border-[#dfe3da] bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#a1a69e] focus:border-[#39754d] focus:ring-2 focus:ring-[#39754d]/10"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="password" class="text-[13px] font-semibold"> Password </label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            placeholder="Buat password"
            autocomplete="new-password"
            required
            class="w-full rounded-md border border-[#dfe3da] bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#a1a69e] focus:border-[#39754d] focus:ring-2 focus:ring-[#39754d]/10"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mt-0.5 w-full rounded-md bg-[#285b3d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#204a31] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ loading ? 'Memproses...' : 'Buat Akun' }}
        </button>
      </form>

      <!-- Login Link -->
      <p class="mt-6 text-center text-sm text-[#777d74]">
        Sudah punya akun?
        <RouterLink
          to="/login"
          class="font-semibold text-[#285b3d] transition hover:text-[#204a31] hover:underline"
        >
          Masuk
        </RouterLink>
      </p>
    </section>
  </main>
</template>
