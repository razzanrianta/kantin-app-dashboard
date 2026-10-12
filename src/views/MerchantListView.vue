<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import type { Merchant } from '@/types/merchant'

const merchants = ref<Merchant[]>([])

const loading = ref(false)

const error = ref('')

async function getMerchants() {
  loading.value = true
  error.value = ''
  try {
    const response = await api.get<Merchant[]>('/merchants')

    merchants.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil data toko'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMerchants()
})
</script>

<template>
  <main class="min-h-screen bg-[#f6f7f2] px-5 py-10 font-sans text-[#252b24] sm:px-8">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <header class="mb-10">
        <div>
          <p class="mb-2 text-sm font-medium text-[#39754d]">KATALOG KANTIN</p>
        </div>
      </header>
      <!-- Merchant Count -->
      <div class="mb-5 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Daftar Toko</h2>
        <span class="text-sm text-[#777d74]"> {{ merchants.length }} toko </span>
      </div>
      <!-- Loading -->
      <div
        v-if="loading"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-16 text-center"
      >
        <p class="text-sm text-[#777d74]">Memuat daftar toko...</p>
      </div>
      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-white px-6 py-10 text-center"
      >
        <p class="font-medium text-red-600">{{ error }}</p>
        <button
          @click="getMerchants"
          class="mt-4 rounded-md bg-[#285b3d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#204a31]"
        >
          Coba Lagi
        </button>
      </div>
      <!-- Empty State -->
      <div
        v-else-if="merchants.length === 0"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-16 text-center"
      >
        <h3 class="text-lg font-semibold">Belum ada toko</h3>
        <p class="mt-2 text-sm text-[#777d74]">Toko yang tersedia akan muncul di halaman ini.</p>
      </div>
      <!-- Merchant Grid -->
      <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="merchant in merchants"
          :key="merchant.id"
          class="flex flex-col rounded-xl border border-[#e8ebe4] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#cbd8c9] hover:shadow-md"
        >
          <!-- Merchant Icon -->
          <div
            class="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#edf3eb] text-[#285b3d]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          <!-- Merchant Info -->
          <div class="flex-1">
            <h3 class="text-lg font-semibold tracking-tight">{{ merchant.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-[#777d74]">
              {{ merchant.description || 'Belum ada deskripsi toko.' }}
            </p>
            <div class="mt-4 flex items-start gap-2 text-sm text-[#777d74]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mt-0.5 shrink-0"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>{{ merchant.location || 'Lokasi belum tersedia' }}</span>
            </div>
          </div>
          <!-- Action -->
          <RouterLink
            :to="`/merchants/${merchant.id}`"
            class="mt-6 flex items-center justify-center gap-2 rounded-md bg-[#285b3d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#204a31]"
          >
            Lihat Toko
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
        </article>
      </div>
    </div>
  </main>
</template>
