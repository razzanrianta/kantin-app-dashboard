<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const auth = useAuthStore()

const cartStore = useCartStore()

async function logout() {
  auth.logout()
}
</script>

<template>
  <nav class="border-b border-[#e8ebe4] bg-white">
    <div
      class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8"
    >
      <!-- Brand -->
      <RouterLink to="/merchants" class="flex items-center gap-3">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#285b3d] text-lg font-bold text-white"
        >
          K
        </div>
        <span class="text-lg font-bold tracking-tight text-[#252b24]">
          Kantin <span class="font-medium text-[#777d74]">FILKOM</span>
        </span>
      </RouterLink>

      <!-- Navigation Links -->
      <div v-if="auth.isLoggedIn" class="flex flex-wrap items-center gap-1">
        <RouterLink
          to="/merchants"
          class="rounded-md px-3 py-2 text-sm font-medium text-[#62695f] transition hover:bg-[#f2f5ef] hover:text-[#285b3d]"
          active-class="!bg-[#edf3eb] !text-[#285b3d]"
        >
          Toko
        </RouterLink>

        <RouterLink
          to="/orders"
          class="rounded-md px-3 py-2 text-sm font-medium text-[#62695f] transition hover:bg-[#f2f5ef] hover:text-[#285b3d]"
          active-class="!bg-[#edf3eb] !text-[#285b3d]"
        >
          Pesanan
        </RouterLink>

        <RouterLink
          v-if="auth.user?.merchants.length"
          to="/myshops"
          class="rounded-md px-3 py-2 text-sm font-medium text-[#62695f] transition hover:bg-[#f2f5ef] hover:text-[#285b3d]"
          active-class="!bg-[#edf3eb] !text-[#285b3d]"
        >
          Toko Saya
        </RouterLink>

        <RouterLink
          to="/cart"
          class="rounded-md px-3 py-2 text-sm font-medium text-[#62695f] transition hover:bg-[#f2f5ef] hover:text-[#285b3d]"
          active-class="!bg-[#edf3eb] !text-[#285b3d]"
        >
          Keranjang
          <span
            v-if="cartStore.itemCount > 0"
            class="ml-1 rounded-full bg-[#285b3d] px-1.5 py-0.5 text-xs font-semibold text-white"
          >
            {{ cartStore.itemCount }}
          </span>
        </RouterLink>

        <RouterLink
          to="/profile"
          class="rounded-md px-3 py-2 text-sm font-medium text-[#62695f] transition hover:bg-[#f2f5ef] hover:text-[#285b3d]"
          active-class="!bg-[#edf3eb] !text-[#285b3d]"
        >
          Profil
        </RouterLink>

        <button
          @click="logout"
          class="ml-1 rounded-md border border-[#dfe3da] px-3 py-2 text-sm font-medium text-[#62695f] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          Keluar
        </button>
      </div>

      <!-- Guest Navigation -->
      <div v-else class="flex items-center gap-2">
        <RouterLink
          to="/login"
          class="rounded-md px-4 py-2 text-sm font-semibold text-[#285b3d] transition hover:bg-[#f2f5ef]"
        >
          Masuk
        </RouterLink>

        <RouterLink
          to="/register"
          class="rounded-md bg-[#285b3d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#204a31]"
        >
          Daftar
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
