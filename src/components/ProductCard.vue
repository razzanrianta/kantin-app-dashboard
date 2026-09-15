<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/merchant'

const props = defineProps<{
  product: Product
}>()

const emits = defineEmits<{
  addToCart: [product: Product]
  decreaseCart: [product: Product]
}>()
</script>

<template>
  <div>
    <img :src="`http://localhost:3000/${product.image}`" alt="gambar" />
    <h3>{{ props.product.name }}</h3>
    <p>Rp{{ props.product.price }}</p>
    <button @click="emits('addToCart', product)">+</button>
    <button @click="emits('decreaseCart', product)">-</button>
  </div>
</template>
