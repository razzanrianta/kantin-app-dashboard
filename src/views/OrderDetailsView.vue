<script setup lang="ts">
import api from '@/api/axios'
import type { Order } from '@/types/order'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const order = ref<Order | null>(null)
const loading = ref(false)
const error = ref('')
const selectedFile = ref<File | null>(null)

async function fetchOrder() {
  loading.value = true
  error.value = ''

  try {
    const orderId = route.params.orderId

    const response = await api.get<Order>(`/orders/${orderId}`)
    order.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambi data order'
  } finally {
    loading.value = false
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]!
  }
}

async function uploadPayment() {
  if (!selectedFile.value || !order.value) {
    return
  }
  const formData = new FormData()

  formData.append('file', selectedFile.value)

  try {
    const response = await api.post(`/orders/${order.value.id}/payment`, formData)

    console.log('Berhasil bayar:', response.data)
  } catch (err) {
    console.log('Payment gagal: ', err)
  }
}

onMounted(() => {
  fetchOrder()
})
</script>

<template>
  <main>
    <h1>Detail Order</h1>

    <p v-if="loading">Loading...</p>

    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="order">
      <h2>Order #{{ order.id }}</h2>

      <p>Status: {{ order.status }}</p>

      <div v-for="item in order.items" :key="item.id">
        <h3>{{ item.product.name }}</h3>

        <p>Harga: Rp{{ item.price }}</p>

        <p>Quantity: {{ item.quantity }}</p>

        <p>Subtotal: Rp{{ item.price * item.quantity }}</p>
      </div>

      <h2>Total: Rp{{ order.totalPrice }}</h2>

      <div>
        <h2>Pembayaran</h2>

        <input type="file" accept="image/*" @change="handleFileChange" />

        <button :disabled="!selectedFile" @click="uploadPayment">Upload Bukti Pembayaran</button>
      </div>
    </div>
  </main>
</template>
