<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import api from '@/api/axios'
import type { CartItem, Merchant, Product } from '@/types/merchant'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const merchant = ref<Merchant | null>(null)
const loading = ref(false)
const error = ref('')

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

onMounted(() => {
  fetchMerchant()
})
</script>

<template>
  <main class="min-h-screen bg-[#f6f7f2] px-5 py-8 font-sans text-[#252b24] sm:px-8 sm:py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Back Navigation -->
      <RouterLink
        to="/merchants"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#777d74] transition hover:text-[#285b3d]"
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
        Kembali ke daftar toko
      </RouterLink>

      <!-- Loading -->
      <div
        v-if="loading"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-16 text-center"
      >
        <p class="text-sm text-[#777d74]">Memuat informasi toko...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-white px-6 py-12 text-center"
      >
        <p class="font-medium text-red-600">{{ error }}</p>
        <button
          @click="fetchMerchant"
          class="mt-4 rounded-md bg-[#285b3d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#204a31]"
        >
          Coba Lagi
        </button>
      </div>

      <template v-else-if="merchant">
        <!-- Merchant Information -->
        <section class="rounded-xl border border-[#e8ebe4] bg-white p-6 sm:p-8">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div
              class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#edf3eb] text-[#285b3d]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 10h18" />
                <path d="M5 10v10h14V10" />
                <path d="m3 10 2-6h14l2 6" />
                <path d="M9 20v-6h6v6" />
              </svg>
            </div>

            <div class="min-w-0 flex-1">
              <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-[#39754d]">
                INFORMASI TOKO
              </p>
              <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl">
                {{ merchant.name }}
              </h1>
              <p class="mt-3 text-sm leading-relaxed text-[#777d74]">
                {{ merchant.description || 'Belum ada deskripsi toko.' }}
              </p>

              <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-6">
                <div class="flex items-start gap-2 text-sm text-[#62695f]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shrink-0"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>{{ merchant.location || 'Lokasi belum tersedia' }}</span>
                </div>

                <div v-if="merchant.phone" class="flex items-start gap-2 text-sm text-[#62695f]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shrink-0"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.73 2.03Z"
                    />
                  </svg>
                  <span>{{ merchant.phone }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Products Header -->
        <section class="mt-10">
          <div class="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 class="text-xl font-semibold tracking-tight sm:text-2xl">Menu Toko</h2>
              <p class="mt-1 text-sm text-[#777d74]">Pilih menu yang ingin kamu pesan.</p>
            </div>

            <span class="shrink-0 text-sm text-[#777d74]">
              {{ merchant.products?.length ?? 0 }} produk
            </span>
          </div>

          <!-- Empty Products -->
          <div
            v-if="!merchant.products?.length"
            class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-14 text-center"
          >
            <h3 class="font-semibold">Belum ada produk</h3>
            <p class="mt-2 text-sm text-[#777d74]">
              Produk dari toko ini akan ditampilkan di sini.
            </p>
          </div>

          <!-- Product Grid -->
          <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductCard
              v-for="product in merchant.products ?? []"
              :key="product.id"
              :product="product"
            />
          </div>
        </section>
      </template>
    </div>
  </main>
</template>
