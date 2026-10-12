<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = authStore.user
</script>

<template>
  <main v-if="user">
    <h3>Name: {{ user.username }}</h3>

    <h3>Email: {{ user.email }}</h3>

    <h3>List Merchant:</h3>
    <div v-for="merchant in user.merchants">
      <p>{{ merchant.name }}</p>
    </div>
  </main>
</template>
