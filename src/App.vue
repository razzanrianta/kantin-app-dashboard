<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.ts'

const auth = useAuthStore()

onMounted(() => {
  auth.initialize()
})
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
