<script setup lang="ts">
import api from '@/api/axios'
import { useRoute } from 'vue-router'
import type { Order } from '@/types/order'
import { onMounted, ref } from 'vue'
import type { UpdatePayment } from '@/types/payment'

const route = useRoute()
const orderId = route.params.orderId
const merchantId = route.params.merchantId
const updatedOrder = ref<UpdatePayment | null>(null)

const order = ref<Order | null>(null)
const loading = ref(false)
const error = ref('')

async function fetchOrder() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get<Order>(`/merchants/myshops/${merchantId}/sales/${orderId}`)
    order.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil detail penjualan'
  } finally {
    loading.value = false
  }
}

async function verify() {
  try {
    const response = await api.patch<UpdatePayment>(`/orders/${orderId}/payment/verify`)
    updatedOrder.value = response.data
  } catch (err) {
    error.value = 'Gagal verifikasi pembayaran'
  }
}

async function reject() {
  try {
    const response = await api.patch<UpdatePayment>(`/orders/${orderId}/payment/reject`)
    updatedOrder.value = response.data
  } catch (err) {
    error.value = 'Gagal menolak pembayaran'
  }
}

onMounted(() => {
  fetchOrder()
})
</script>

<template>
  <main>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="order === null">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <h2>Order #{{ order.id }}</h2>
      <p></p>
    </div>
  </main>
</template>
