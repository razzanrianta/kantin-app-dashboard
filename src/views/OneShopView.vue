<script setup lang="ts">
import api from '@/api/axios'
import type { Merchant } from '@/types/merchant'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const myshop = ref<Merchant | null>(null)

const route = useRoute()
const router = useRouter()
const merchantId = route.params.merchantId

const loading = ref(false)
const error = ref('')

async function fetchShop() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get<Merchant>(`/merchants/myshops/${merchantId}`)
    myshop.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil data toko'
  } finally {
    loading.value = false
  }
}

function goToSales(shop: Merchant) {
  const shopId = shop.id
  router.push(`/myshops/${shopId}/sales`)
}
onMounted(() => {
  fetchShop()
})
</script>

<template>
  <main class="min-h-screen bg-[#f6f7f2] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <!-- Navigasi kembali -->
      <RouterLink
        to="/myshops"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#285b3d] transition hover:text-[#204a31]"
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

        Kembali ke Toko Saya
      </RouterLink>

      <!-- Loading -->
      <div
        v-if="loading"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-14 text-center"
      >
        <div
          class="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#e8ebe4] border-t-[#285b3d]"
        ></div>

        <p class="mt-4 text-sm text-[#777d74]">Memuat informasi toko...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-white p-6">
        <h2 class="font-semibold text-red-700">Gagal memuat toko</h2>

        <p class="mt-2 text-sm text-[#777d74]">
          {{ error }}
        </p>
      </div>

      <!-- Toko tidak ditemukan -->
      <div
        v-else-if="!myshop"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-14 text-center"
      >
        <h2 class="text-lg font-semibold text-[#252b24]">Data toko tidak ditemukan</h2>

        <p class="mt-2 text-sm text-[#777d74]">
          Informasi toko belum tersedia atau toko tidak dapat ditemukan.
        </p>
      </div>

      <!-- Detail toko -->
      <div v-else>
        <!-- Informasi toko -->
        <section class="rounded-xl border border-[#e8ebe4] bg-white p-5 sm:p-7">
          <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div class="flex min-w-0 gap-4">
              <div
                class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#eef3eb] text-[#285b3d] sm:h-20 sm:w-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 10h18" />
                  <path d="M5 10v10h14V10" />
                  <path d="M3 10l2-7h14l2 7" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>

              <div class="min-w-0">
                <p class="mb-1 text-sm font-medium text-[#285b3d]">TOKO SAYA</p>

                <h1
                  class="break-words text-2xl font-bold tracking-tight text-[#252b24] sm:text-3xl"
                >
                  {{ myshop.name }}
                </h1>

                <p class="mt-2 text-sm leading-6 text-[#777d74]">
                  {{ myshop.description || 'Belum ada deskripsi toko.' }}
                </p>
              </div>
            </div>

            <button
              class="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#285b3d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#204a31]"
              @click="goToSales(myshop)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 8H6" />
                <circle cx="10" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
              </svg>

              Lihat Semua Pesanan
            </button>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-3 border-t border-[#e8ebe4] pt-5 sm:grid-cols-2">
            <div class="flex items-start gap-3 rounded-lg bg-[#f8f9f6] p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#285b3d"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mt-0.5 shrink-0"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <div class="min-w-0">
                <p class="text-xs text-[#777d74]">Lokasi toko</p>
                <p class="mt-1 break-words text-sm font-medium text-[#252b24]">
                  {{ myshop.location || 'Belum diisi' }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 rounded-lg bg-[#f8f9f6] p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#285b3d"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mt-0.5 shrink-0"
              >
                <path
                  d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z"
                />
              </svg>

              <div class="min-w-0">
                <p class="text-xs text-[#777d74]">Nomor telepon</p>
                <p class="mt-1 break-words text-sm font-medium text-[#252b24]">
                  {{ myshop.phone || 'Belum diisi' }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Daftar produk -->
        <section class="mt-8">
          <div class="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold text-[#252b24]">Produk Toko</h2>

              <p class="mt-1 text-sm text-[#777d74]">Daftar produk yang tersedia di tokomu.</p>
            </div>

            <span
              class="shrink-0 rounded-full bg-[#e8efe5] px-3 py-1.5 text-xs font-semibold text-[#285b3d]"
            >
              {{ myshop.products?.length ?? 0 }} produk
            </span>
          </div>

          <!-- Produk kosong -->
          <div
            v-if="!myshop.products?.length"
            class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-12 text-center"
          >
            <h3 class="font-semibold text-[#252b24]">Belum ada produk</h3>

            <p class="mt-2 text-sm text-[#777d74]">
              Produk yang kamu tambahkan akan muncul di sini.
            </p>
          </div>

          <!-- Grid produk -->
          <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="product in myshop.products"
              :key="product.id"
              class="overflow-hidden rounded-xl border border-[#e8ebe4] bg-white transition hover:border-[#cbd8c8] hover:shadow-sm"
            >
              <div class="aspect-[4/3] overflow-hidden bg-[#eef3eb]">
                <img
                  v-if="product.image"
                  :src="`http://localhost:3000/${product.image}`"
                  :alt="product.name"
                  loading="lazy"
                  class="h-full w-full object-cover"
                />

                <div v-else class="flex h-full items-center justify-center text-sm text-[#777d74]">
                  Tidak ada gambar
                </div>
              </div>

              <div class="p-4">
                <h3 class="break-words font-semibold text-[#252b24]">
                  {{ product.name }}
                </h3>

                <p class="mt-2 text-lg font-bold text-[#285b3d]">
                  {{
                    new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    }).format(product.price)
                  }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style></style>
