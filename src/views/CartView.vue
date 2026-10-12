<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import api from '@/api/axios'
import type { CreateOrderRequest } from '@/types/order'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()

const loading = ref(false)
const error = ref('')

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

async function checkout() {
  if (cartStore.items.length === 0 || loading.value) {
    return
  }

  const merchantId = cartStore.items[0]!.product.merchantId

  // Satu order hanya untuk satu merchant.
  const hasDifferentMerchant = cartStore.items.some(
    (item) => item.product.merchantId !== merchantId,
  )

  if (hasDifferentMerchant) {
    error.value = 'Pesanan hanya dapat berisi produk dari satu toko.'
    return
  }

  const payload: CreateOrderRequest = {
    merchantId,
    items: cartStore.items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  }

  loading.value = true
  error.value = ''

  try {
    const response = await api.post('/orders', payload)
    const orderId = response.data.id

    cartStore.clearCart()
    await router.push(`/orders/${orderId}`)
  } catch (err) {
    console.error('Checkout gagal:', err)
    error.value = 'Checkout gagal. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-[#f6f7f2] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <p class="mb-2 text-sm font-medium text-[#285b3d]">KANTIN FILKOM</p>

        <h1 class="text-2xl font-bold tracking-tight text-[#252b24] sm:text-3xl">
          Keranjang Belanja
        </h1>

        <p class="mt-2 text-sm text-[#777d74]">Periksa pesananmu sebelum melanjutkan checkout.</p>
      </div>

      <!-- Keranjang kosong -->
      <div
        v-if="cartStore.items.length === 0"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-14 text-center"
      >
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3eb]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#285b3d"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>

        <h2 class="text-lg font-semibold text-[#252b24]">Keranjang masih kosong</h2>

        <p class="mt-2 text-sm text-[#777d74]">Yuk, cari makanan yang ingin kamu pesan.</p>

        <RouterLink
          to="/merchants"
          class="mt-6 inline-flex items-center justify-center rounded-md bg-[#285b3d] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#204a31]"
        >
          Lihat Toko
        </RouterLink>
      </div>

      <!-- Daftar produk dan ringkasan pesanan -->
      <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <!-- Daftar produk -->
        <section class="space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="flex gap-4 rounded-xl border border-[#e8ebe4] bg-white p-4 sm:p-5"
          >
            <div
              class="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#eef3eb] text-[#285b3d]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 11h18" />
                <path d="M5 11a7 7 0 0 1 14 0" />
                <path d="M5 11v2a7 7 0 0 0 14 0v-2" />
                <path d="M12 4V2" />
              </svg>
            </div>

            <div class="min-w-0 flex-1">
              <h2 class="font-semibold text-[#252b24]">
                {{ item.product.name }}
              </h2>

              <p class="mt-1 text-sm text-[#777d74]">
                {{ formatRupiah(item.product.price) }} × {{ item.quantity }}
              </p>

              <p class="mt-3 font-semibold text-[#285b3d]">
                {{ formatRupiah(item.product.price * item.quantity) }}
              </p>
            </div>
          </div>
        </section>

        <!-- Ringkasan checkout -->
        <aside class="h-fit rounded-xl border border-[#e8ebe4] bg-white p-5 sm:p-6">
          <h2 class="text-lg font-semibold text-[#252b24]">Ringkasan Pesanan</h2>

          <div class="mt-5 flex items-center justify-between text-sm text-[#777d74]">
            <span>Total item</span>
            <span
              >{{ cartStore.items.reduce((total, item) => total + item.quantity, 0) }} item</span
            >
          </div>

          <div class="my-4 border-t border-[#e8ebe4]"></div>

          <div class="flex items-center justify-between gap-3">
            <span class="text-sm font-medium text-[#252b24]"> Total pembayaran </span>

            <span class="text-lg font-bold text-[#285b3d]">
              {{ formatRupiah(cartStore.total) }}
            </span>
          </div>

          <p
            v-if="error"
            class="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {{ error }}
          </p>

          <button
            class="mt-6 w-full rounded-md bg-[#285b3d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#204a31] disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="loading"
            @click="checkout"
          >
            {{ loading ? 'Memproses pesanan...' : 'Checkout' }}
          </button>

          <p class="mt-3 text-center text-xs text-[#777d74]">
            Pastikan pesananmu sudah sesuai sebelum checkout.
          </p>
        </aside>
      </div>
    </div>
  </main>
</template>
