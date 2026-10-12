<script setup lang="ts">
import api from '@/api/axios'
import type { Order } from '@/types/order'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const order = ref<Order | null>(null)
const loading = ref(false)
const uploading = ref(false)
const error = ref('')
const selectedFile = ref<File | null>(null)
const successMessage = ref('')

async function fetchOrder() {
  loading.value = true
  error.value = ''

  try {
    const orderId = route.params.orderId
    const response = await api.get<Order>(`/orders/${orderId}`)

    order.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil data order'
    console.error('Gagal mengambil order:', err)
  } finally {
    loading.value = false
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]!
    successMessage.value = ''
    error.value = ''
  }
}

async function uploadPayment() {
  if (!selectedFile.value || !order.value || uploading.value) {
    return
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  uploading.value = true
  error.value = ''
  successMessage.value = ''

  try {
    // Upload bukti pembayaran.
    await api.post(`/orders/${order.value.id}/payment`, formData)

    // Ambil ulang order untuk mendapatkan status terbaru.
    await fetchOrder()

    // Kosongkan file setelah proses upload berhasil.
    selectedFile.value = null

    successMessage.value = 'Bukti pembayaran berhasil diunggah.'
  } catch (err) {
    error.value = 'Gagal mengunggah bukti pembayaran.'
    console.error('Payment gagal:', err)
  } finally {
    uploading.value = false
  }
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
  fetchOrder()
})
</script>

<template>
  <main class="min-h-screen bg-[#f6f7f2] px-5 py-8 font-sans text-[#252b24] sm:px-8 sm:py-10">
    <div class="mx-auto max-w-4xl">
      <!-- Back Navigation -->
      <RouterLink
        to="/orders"
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
        Kembali ke pesanan
      </RouterLink>

      <!-- Loading -->
      <div
        v-if="loading"
        class="rounded-xl border border-[#e8ebe4] bg-white px-6 py-16 text-center"
      >
        <p class="text-sm text-[#777d74]">Memuat detail pesanan...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-white px-6 py-12 text-center"
      >
        <p class="font-medium text-red-600">{{ error }}</p>
      </div>

      <template v-else-if="order">
        <!-- Page Heading -->
        <header class="mb-7">
          <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-[#39754d]">
            RINGKASAN TRANSAKSI
          </p>
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Detail Pesanan</h1>
          <p class="mt-2 text-sm text-[#777d74]">
            Periksa detail item dan status pembayaran pesananmu.
          </p>
        </header>

        <!-- Order Information -->
        <section class="mb-5 rounded-xl border border-[#e8ebe4] bg-white p-5 sm:p-6">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-xs font-medium text-[#858a81]">NOMOR PESANAN</p>
              <h2 class="mt-1 text-xl font-semibold">Order #{{ order.id }}</h2>
            </div>

            <span
              class="inline-flex w-fit items-center rounded-full bg-[#edf3eb] px-3 py-1.5 text-xs font-semibold text-[#285b3d]"
            >
              {{ getOrderStatus(order.status) }}
            </span>
          </div>
        </section>

        <!-- Order Items -->
        <section class="rounded-xl border border-[#e8ebe4] bg-white p-5 sm:p-6">
          <h2 class="mb-5 text-lg font-semibold">Item Pesanan</h2>

          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-start justify-between gap-4 border-b border-[#edf0e9] py-4 first:pt-0 last:border-b-0 last:pb-0"
          >
            <div class="min-w-0">
              <h3 class="font-semibold">{{ item.product.name }}</h3>
              <p class="mt-1 text-sm text-[#777d74]">
                {{ item.quantity }} ×
                {{
                  new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0,
                  }).format(item.price)
                }}
              </p>
            </div>

            <p class="shrink-0 text-sm font-semibold">
              {{
                new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(item.price * item.quantity)
              }}
            </p>
          </div>

          <!-- Total -->
          <div class="mt-6 flex items-center justify-between gap-4 border-t border-[#dfe3da] pt-5">
            <span class="font-semibold">Total Pembayaran</span>
            <span class="text-xl font-bold text-[#285b3d]">
              {{
                new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(order.totalPrice)
              }}
            </span>
          </div>
        </section>

        <!-- Payment Section -->
        <section
          v-if="order.status === 'WAITING_PAYMENT'"
          class="mt-5 rounded-xl border border-[#dce6d8] bg-white p-5 sm:p-6"
        >
          <div class="mb-5">
            <h2 class="text-lg font-semibold">Pembayaran</h2>
            <p class="mt-2 text-sm leading-relaxed text-[#777d74]">
              Unggah bukti pembayaran dalam bentuk gambar untuk melanjutkan proses pesananmu.
            </p>
          </div>

          <div class="rounded-lg border border-dashed border-[#cbd8c9] bg-[#f8faf6] p-5">
            <label for="payment-proof" class="mb-3 block text-sm font-semibold">
              Bukti Pembayaran
            </label>

            <input
              id="payment-proof"
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="block w-full cursor-pointer text-sm text-[#62695f] file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#edf3eb] file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-[#285b3d] hover:file:bg-[#dfeadd]"
            />

            <p class="mt-3 text-xs leading-relaxed text-[#858a81]">
              Pilih gambar bukti transfer atau pembayaran dari perangkatmu.
            </p>
          </div>

          <button
            :disabled="!selectedFile"
            @click="uploadPayment"
            class="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-[#285b3d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#204a31] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m17 8-5-5-5 5" />
              <path d="M12 3v12" />
            </svg>
            Upload Bukti Pembayaran
          </button>
        </section>

        <!-- Payment Status for Other States -->
        <section v-else class="mt-5 rounded-xl border border-[#e8ebe4] bg-white p-5 sm:p-6">
          <h2 class="font-semibold">Informasi Pembayaran</h2>
          <p class="mt-2 text-sm leading-relaxed text-[#777d74]">
            {{
              order.status === 'PAID'
                ? 'Pembayaran pesanan ini telah berhasil.'
                : 'Tidak ada tindakan pembayaran yang diperlukan saat ini.'
            }}
          </p>
        </section>
      </template>
    </div>
  </main>
</template>
