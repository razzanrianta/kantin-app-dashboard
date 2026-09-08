<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axios'

const merchants = ref([])

const loading = ref(false)

const error = ref('')

async function getMerchants() {
  loading.value = true
  error.value = ''
  try {
    const response = await api.get('/ merchants')

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

  <div v-else v-for="merchant in merchants">
    <h2>{{ merchant }}</h2>
  </div>
</template>
