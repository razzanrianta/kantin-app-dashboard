<script setup lang="ts">
import api from '@/api/axios'
import type { Order } from '@/types/order'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const orders = ref<Order[]>([])
const router = useRouter()

const loading = ref(false)
const error = ref('')

async function fetchOrders() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get('/orders/purchases')

    orders.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil semua pesanan'
  } finally {
    loading.value = false
  }
}

function formatDateWeb(dateString: string) {
  if (!dateString) return '-'

  const date = new Date(dateString)

  return (
    new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }).format(date) + ' WIB'
  )
}

function goToOrderDetail(orderId: number) {
  router.push(`/orders/${orderId}`)
}

function getOrderStatus(status: string) {
  switch (status) {
    case 'WAITING_PAYMENT':
      return 'Menunggu bukti pembayaran'
    case 'WAITING_VERIFICATION':
      return 'Menunggu verifikasi penjual'
    case 'PAID':
      return 'Penjual mulai menyiapkan makanan'
    case 'READY':
      return 'Makanan sudah bisa diambil'
    case 'COMPLETED':
      return 'Pesanan sudah selesai'
    case 'CANCELLED':
      return 'Pesanan dibatalkan'
    default:
      return status
  }
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <main class="min-h-screen bg-[#f6f7f2] px-5 py-8 font-sans text-[#252b24] sm:px-8 sm:py-10">
    <div class="mx-auto max-w-5xl">
      <!-- Header -->
      <header class="mb-8">
        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-[#39754d]">
          AKTIVITAS PEMBELIAN
        </p>
        <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Pesanan Saya</h1>
        <p class="mt-3 text-sm leading-relaxed text-[#777d74]">
          Pantau pesanan dan lihat detail pembelianmu di sini.
        </p>
      </header>

      <!-- Loading -->
      <div
        v-if="loading"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-16 text-center"
      >
        <p class="text-sm text-[#777d74]">Memuat pesanan...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-white px-6 py-12 text-center"
      >
        <p class="font-medium text-red-600">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="orders.length === 0"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-16 text-center"
      >
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3eb] text-[#285b3d]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>

        <h2 class="text-lg font-semibold">Belum ada pesanan</h2>
        <p class="mt-2 text-sm text-[#777d74]">Yuk, cari makanan favoritmu di kantin.</p>

        <RouterLink
          to="/merchants"
          class="mt-6 inline-flex items-center justify-center rounded-md bg-[#285b3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#204a31]"
        >
          Jelajahi Toko
        </RouterLink>
      </div>

      <!-- Order List -->
      <div v-else class="flex flex-col gap-4">
        <article
          v-for="order in orders"
          :key="order.id"
          class="rounded-xl border border-[#e8ebe4] bg-white p-5 transition hover:border-[#cbd8c9] sm:p-6"
        >
          <!-- Order Header -->
          <div
            class="flex flex-col gap-3 border-b border-[#edf0e9] pb-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <p class="text-xs font-medium text-[#858a81]">NOMOR PESANAN</p>
              <h2 class="mt-1 text-lg font-semibold">Order #{{ order.id }}</h2>
              <p class="mt-1 text-sm text-[#777d74]">
                {{ formatDateWeb(order.createdAt) }}
              </p>
            </div>

            <!-- Status Badge -->
            <span
              class="inline-flex w-fit items-center rounded-full bg-[#edf3eb] px-3 py-1.5 text-xs font-semibold text-[#285b3d]"
            >
              {{ getOrderStatus(order.status) }}
            </span>
          </div>

          <!-- Order Information -->
          <div class="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-start gap-3">
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#edf3eb] text-[#285b3d]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 10h18" />
                  <path d="M5 10v10h14V10" />
                  <path d="m3 10 2-6h14l2 6" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>

              <div>
                <p class="text-xs text-[#858a81]">Toko</p>
                <p class="mt-1 font-semibold">{{ order.merchant.name }}</p>
              </div>
            </div>

            <div class="sm:text-right">
              <p class="text-xs text-[#858a81]">Total Pembayaran</p>
              <p class="mt-1 text-xl font-bold text-[#285b3d]">
                {{
                  new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0,
                  }).format(order.totalPrice)
                }}
              </p>
            </div>
          </div>

          <!-- Action -->
          <div class="border-t border-[#edf0e9] pt-4">
            <button
              @click="goToOrderDetail(order.id)"
              class="flex w-full items-center justify-center gap-2 rounded-md border border-[#dfe3da] px-4 py-3 text-sm font-semibold text-[#285b3d] transition hover:border-[#285b3d] hover:bg-[#f2f5ef] sm:ml-auto sm:w-auto"
            >
              Lihat Detail
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>
