<script setup lang="ts">
import api from '@/api/axios'
import type { Order } from '@/types/order'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const orders = ref<Order[]>([])

const route = useRoute()

const merchantId = route.params.merchantId

const loading = ref(false)
const error = ref('')

async function fetchOrders() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get<Order[]>(`/merchants/myshops/${merchantId}/sales`)

    orders.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil penjualan'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <main class="min-h-screen bg-[#f6f7f2] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <!-- Header -->
      <div class="mb-8">
        <RouterLink
          :to="`/myshops/${merchantId}`"
          class="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#285b3d] transition hover:text-[#204a31]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>

          Kembali ke Toko
        </RouterLink>

        <p class="mb-2 text-sm font-medium text-[#285b3d]">DASHBOARD PENJUAL</p>

        <h1 class="text-2xl font-bold tracking-tight text-[#252b24] sm:text-3xl">Pesanan Masuk</h1>

        <p class="mt-2 text-sm text-[#777d74]">
          Pantau pesanan pembeli dan periksa detail setiap transaksi.
        </p>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-14 text-center"
      >
        <div
          class="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#e8ebe4] border-t-[#285b3d]"
        ></div>

        <p class="mt-4 text-sm text-[#777d74]">Memuat pesanan...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-white p-6">
        <h2 class="font-semibold text-red-700">Gagal memuat pesanan</h2>

        <p class="mt-2 text-sm text-[#777d74]">
          {{ error }}
        </p>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="orders.length === 0"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-14 text-center"
      >
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3eb] text-[#285b3d]"
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
            <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 8H6" />
            <circle cx="10" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
          </svg>
        </div>

        <h2 class="text-lg font-semibold text-[#252b24]">Belum ada pesanan</h2>

        <p class="mt-2 text-sm text-[#777d74]">Pesanan dari pembeli akan muncul di halaman ini.</p>
      </div>

      <!-- Order list -->
      <div v-else class="space-y-4">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="font-semibold text-[#252b24]">Daftar Pesanan</h2>

          <span class="rounded-full bg-[#e8efe5] px-3 py-1.5 text-xs font-semibold text-[#285b3d]">
            {{ orders.length }} pesanan
          </span>
        </div>

        <article
          v-for="order in orders"
          :key="order.id"
          class="rounded-xl border border-[#e8ebe4] bg-white p-5 transition hover:border-[#cbd8c8] hover:shadow-sm sm:p-6"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <!-- Informasi pesanan -->
            <div class="min-w-0">
              <p class="text-xs font-medium uppercase tracking-wide text-[#777d74]">
                Nomor Pesanan
              </p>

              <h3 class="mt-1 text-lg font-bold text-[#252b24]">Order #{{ order.id }}</h3>

              <p class="mt-3 text-sm text-[#777d74]">Pembeli</p>

              <p class="mt-1 font-medium text-[#252b24]">
                {{ order.buyer.username }}
              </p>
            </div>

            <!-- Status -->
            <span
              class="inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold"
              :class="{
                'bg-amber-50 text-amber-700':
                  order.status === 'WAITING_PAYMENT' || order.status === 'WAITING_VERIFICATION',
                'bg-blue-50 text-blue-700': order.status === 'PAID' || order.status === 'READY',
                'bg-green-50 text-green-700': order.status === 'COMPLETED',
                'bg-red-50 text-red-700': order.status === 'CANCELLED',
              }"
            >
              {{ order.status }}
            </span>
          </div>

          <div class="my-5 border-t border-[#e8ebe4]"></div>

          <!-- Total dan aksi -->
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-[#777d74]">Total Pembayaran</p>

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

            <RouterLink
              :to="`/my-shops/${merchantId}/sales/${order.id}`"
              class="inline-flex items-center justify-center gap-2 rounded-md bg-[#285b3d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#204a31]"
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
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>
