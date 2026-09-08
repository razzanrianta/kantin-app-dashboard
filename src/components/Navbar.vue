<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

async function logout() {
  auth.logout()
}
</script>

<template>
  <nav>
    <div>Kantin FILKOM</div>
    <template v-if="auth.isLoggedIn">
      <RouterLink to="/merchants">Merchants</RouterLink>

      <RouterLink to="/orders">My Orders</RouterLink>

      <button @click="logout">Logout</button>
    </template>

    <template v-else>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </template>
  </nav>
</template>
