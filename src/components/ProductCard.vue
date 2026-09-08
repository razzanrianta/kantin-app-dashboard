<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  name: string
  price: number
}>()

const emit = defineEmits<{
  quantityChange: [quantity: number]
}>()

const quantity = ref(0)

function increase() {
  quantity.value++

  emit('quantityChange', quantity.value)
}

function decrease() {
  if (quantity.value > 0) {
    quantity.value--
  }

  emit('quantityChange', quantity.value)
}
</script>

<template>
  <div>
    <h3>{{ props.name }}</h3>
    <p>Rp{{ props.price }}</p>
    <button @click="decrease">-</button>
    <span>
      {{ quantity }}
    </span>
    <button @click="increase">+</button>
  </div>
</template>
