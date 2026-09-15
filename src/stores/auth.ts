import type { User } from '@/types/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('access_token'))

  const isLoggedIn = ref(!!token.value)

  const user = ref<User | null>(null)

  function setToken(newToken: string) {
    token.value = newToken
    isLoggedIn.value = true

    localStorage.setItem('access_token', newToken)
  }

  async function fetchUser() {
    const response = await api.get<User>('/auth/me')

    user.value = response.data
  }

  function logout() {
    token.value = null
    isLoggedIn.value = false

    localStorage.removeItem('access_token')
  }

  async function initialize() {
    if (!token.value) {
      return
    }

    try {
      await fetchUser()
    } catch {
      logout()
    }
  }

  return {
    token,
    isLoggedIn,
    setToken,
    logout,
    user,
    fetchUser,
    initialize,
  }
})
