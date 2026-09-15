<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import api from '@/api/axios'
import type { CreateOrderRequest } from '@/types/order'
import { useRouter } from 'vue-router'

const router = useRouter()

const cartStore = useCartStore()

async function checkout() {
  if (cartStore.items.length === 0) {
    return
  }
  const merchantId = cartStore.items[0]!.product.merchantId

  const payload: CreateOrderRequest = {
    merchantId,
    items: cartStore.items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  }

  try {
    const response = await api.post('/orders', payload)
    const orderId = response.data.orderId
    console.log(response.data)
    cartStore.clearCart()
    router.push(`/orders/${orderId}`)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <main>
    <h1>Keranjang</h1>

    <p v-if="cartStore.items.length === 0">Keranjang Masih Kosong</p>

    <div v-for="item in cartStore.items" :key="item.product.id">
      <h2>{{ item.product.name }}</h2>

      <p>Harga: Rp{{ item.product.price }}</p>

      <p>Quantity: {{ item.quantity }}</p>

      <p>Subtotal: {{ item.product.price * item.quantity }}</p>
    </div>
    <h2>Total: Rp{{ cartStore.total }}</h2>
    <button v-if="cartStore.items.length > 0" @click="checkout">Checkout</button>
  </main>
</template>
