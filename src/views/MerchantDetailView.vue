<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import api from '@/api/axios'
import type { CartItem, Merchant, Product } from '@/types/merchant'
import ProductCard from '@/components/ProductCard.vue'
import { useCartStore } from '@/stores/cart'

const route = useRoute()

const merchant = ref<Merchant | null>(null)

const loading = ref(false)
const error = ref('')

const cartStore = useCartStore()

async function fetchMerchant() {
  loading.value = true
  error.value = ''

  try {
    const merchantId = route.params.merchantId

    const response = await api.get<Merchant>(`/merchants/${merchantId}`)

    merchant.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil data merchant'
  } finally {
    loading.value = false
  }
}

function addToCart(product: Product) {
  cartStore.addToCart(product)
}

function decreaseCart(product: Product) {
  cartStore.decreaseCart(product)
}

onMounted(() => {
  fetchMerchant()
})
</script>

<template>
  <main>
    <h1>Detail Merchant</h1>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="merchant">
      <h1>{{ merchant.name }}</h1>

      <p>{{ merchant.description }}</p>
      <p>{{ merchant.location }}</p>
      <p>{{ merchant.phone }}</p>

      <h2>Produk</h2>

      <ProductCard
        v-for="product in merchant.products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        @decrease-cart="decreaseCart"
      />
    </div>

    <div v-if="cartStore.items.length > 0">
      <h2>Keranjang</h2>

      <div v-for="item in cartStore.items" :key="item.product.id">
        <p>{{ item.product.name }}</p>
        <p>{{ item.quantity }}</p>
      </div>
    </div>
  </main>
</template>
