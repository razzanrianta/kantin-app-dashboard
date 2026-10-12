<script setup lang="ts">
import api from '@/api/axios'
import type { Merchant } from '@/types/merchant'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const myshops = ref<Merchant[]>([])

const loading = ref(false)
const error = ref('')
const route = useRoute()

async function fetchShops() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get<Merchant[]>(`/merchants/myshops`)

    myshops.value = response.data
  } catch (err) {
    error.value = 'Tidak ada toko yang ditemukan'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchShops()
})
</script>

<template>
  <main class="min-h-screen bg-[#f6f7f2] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <!-- Header -->
      <div class="mb-8">
        <p class="mb-2 text-sm font-medium text-[#285b3d]">KANTIN FILKOM</p>

        <h1 class="text-2xl font-bold tracking-tight text-[#252b24] sm:text-3xl">Toko Saya</h1>

        <p class="mt-2 text-sm text-[#777d74]">Kelola dan lihat informasi toko yang kamu miliki.</p>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-14 text-center"
      >
        <div
          class="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#e8ebe4] border-t-[#285b3d]"
        ></div>

        <p class="mt-4 text-sm text-[#777d74]">Memuat daftar toko...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-white p-6">
        <h2 class="font-semibold text-red-700">Gagal memuat toko</h2>

        <p class="mt-2 text-sm text-[#777d74]">
          {{ error }}
        </p>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="myshops.length === 0"
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
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4v18" />
            <path d="M19 21V11l-6-4" />
            <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
          </svg>
        </div>

        <h2 class="text-lg font-semibold text-[#252b24]">Kamu belum memiliki toko</h2>

        <p class="mx-auto mt-2 max-w-md text-sm text-[#777d74]">
          Toko yang kamu miliki akan muncul di sini setelah tersedia pada akunmu.
        </p>
      </div>

      <!-- Shop list -->
      <div v-else>
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-semibold text-[#252b24]">Daftar Toko</h2>

          <span class="rounded-full bg-[#e8efe5] px-3 py-1 text-xs font-medium text-[#285b3d]">
            {{ myshops.length }} toko
          </span>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="myshop in myshops"
            :key="myshop.id"
            class="flex flex-col rounded-xl border border-[#e8ebe4] bg-white p-5 transition hover:border-[#cbd8c8] hover:shadow-sm"
          >
            <!-- Icon dan nama toko -->
            <div class="mb-4 flex items-start gap-3">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef3eb] text-[#285b3d]"
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
                  <path d="M3 10l2-7h14l2 7" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="break-words font-semibold text-[#252b24]">
                  {{ myshop.name }}
                </h3>

                <p class="mt-1 text-xs text-[#777d74]">Toko milik Anda</p>
              </div>
            </div>

            <!-- Detail link -->
            <div class="mt-auto border-t border-[#e8ebe4] pt-4">
              <RouterLink
                :to="`/myshops/${myshop.id}`"
                class="flex w-full items-center justify-center gap-2 rounded-md bg-[#285b3d] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#204a31]"
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
    </div>
  </main>
</template>
