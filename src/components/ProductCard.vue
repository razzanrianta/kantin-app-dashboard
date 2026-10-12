<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/merchant'
import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

function getQuantity(productId: number) {
  return cartStore.items.find((item) => item.product.id === productId)?.quantity ?? 0
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}
</script>

<template>
  <article
    class="flex h-full flex-col overflow-hidden rounded-xl border border-[#e8ebe4] bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#cbd8c9] hover:shadow-md"
  >
    <!-- Product Image -->
    <div class="aspect-[4/3] overflow-hidden bg-[#edf0e9]">
      <img
        :src="`http://localhost:3000/${product.image}`"
        :alt="product.name"
        class="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
    <!-- Product Information -->
    <div class="flex flex-1 flex-col p-4">
      <h3 class="line-clamp-2 font-semibold leading-snug text-[#252b24]">{{ product.name }}</h3>
      <p class="mt-2 text-base font-bold text-[#285b3d]">{{ formatPrice(product.price) }}</p>
      <!-- Cart Controls -->
      <div class="mt-auto flex items-center justify-between gap-3 pt-5">
        <span class="text-xs text-[#777d74]">Jumlah</span>
        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="cartStore.decreaseCart(product)"
            :disabled="getQuantity(product.id) === 0"
            :aria-label="`Kurangi ${product.name}`"
            class="flex h-8 w-8 items-center justify-center rounded-md border border-[#dfe3da] text-lg font-medium text-[#285b3d] transition hover:bg-[#edf3eb] disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span class="min-w-4 text-center text-sm font-semibold tabular-nums" aria-live="polite">
            {{ getQuantity(product.id) }}
          </span>
          <button
            type="button"
            @click="cartStore.addToCart(product)"
            :aria-label="`Tambah ${product.name}`"
            class="flex h-8 w-8 items-center justify-center rounded-md bg-[#285b3d] text-lg font-medium text-white transition hover:bg-[#204a31]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
