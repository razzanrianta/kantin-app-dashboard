<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalPrice: number
}>()
const hasItems = computed(() => {
  if (props.totalPrice > 0) {
    return true
  } else {
    return false
  }
})
</script>

<template>
  <div>
    <h3>Keranjang</h3>

    <p>Total: Rp{{ totalPrice }}</p>

    <button v-if="hasItems">Lanjut ke Order</button>
  </div>
</template>
