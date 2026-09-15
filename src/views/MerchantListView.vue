<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import type { Merchant } from '@/types/merchant'

const merchants = ref<Merchant[]>([])

const loading = ref(false)

const error = ref('')

async function getMerchants() {
  loading.value = true
  error.value = ''
  try {
    const response = await api.get<Merchant[]>('/merchants')

    merchants.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil data toko'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMerchants()
})
</script>

<template>
  <h1>Daftar Merchant</h1>

  <p v-if="loading">Loading...</p>

  <p v-else-if="error">{{ error }}</p>

  <div v-else>
    <p v-if="merchants.length === 0">Belum ada merchant</p>

    <div v-for="merchant in merchants" :key="merchant.id">
      <h2>{{ merchant.name }}</h2>
      <p>{{ merchant.description }}</p>
      <p>{{ merchant.location }}</p>

      <RouterLink :to="`/merchants/${merchant.id}`">Lihat Merchant</RouterLink>
    </div>
  </div>
</template>
