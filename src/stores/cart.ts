import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem, Product } from '@/types/merchant'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  function addToCart(product: Product) {
    const existingItem = items.value.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({
        product,
        quantity: 1,
      })
    }
  }

  function decreaseCart(product: Product) {
    const existingItem = items.value.find((item) => item.product.id === product.id)

    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--
      if (existingItem.quantity === 0) {
        const currentId = existingItem.product.id
        items.value = items.value.filter((item) => item.product.id !== currentId)
      }
    } else {
      return
    }
  }

  function clearCart() {
    items.value = []
  }

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  return {
    items,
    addToCart,
    decreaseCart,
    total,
    itemCount,
    clearCart,
  }
})
