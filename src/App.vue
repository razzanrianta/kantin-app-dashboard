<script setup lang="ts">
import CartSummary from './components/CartSummary.vue'
import Navbar from './components/Navbar.vue'
import ProductCard from './components/ProductCard.vue'
import { reactive } from 'vue'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

const cart = reactive([
  {
    productId: 1,
    name: 'Nasi Goreng',
    price: 15000,
    quantity: 0,
  },
  {
    productId: 2,
    name: 'Ayam Geprek',
    price: 18000,
    quantity: 0,
  },
])

const totalPrice = computed(() => {
  return cart.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0)
})

const hasItems = computed(() => {
  return cart.some((product) => product.quantity > 0)
})

function increase(productId: number) {
  const product = cart.find((product) => product.productId === productId)

  if (product) {
    product.quantity++
  }
}

function decrease(productId: number) {
  const product = cart.find((product) => product.productId === productId)

  if (product && product.quantity > 0) {
    product.quantity--
  }
}
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
