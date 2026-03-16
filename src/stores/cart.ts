import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Product } from '@/models/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  const itemCount = computed(() => items.value.length)
  const subtotal = computed(() => items.value.reduce((total, product) => total + product.price, 0))
  const savings = computed(() => items.value.reduce((total, product) => total + product.savings, 0))
  const total = computed(() => subtotal.value - savings.value)

  function addItem(product: Product) {
    items.value.push(product)
  }

  function removeItem(index: number) {
    items.value.splice(index, 1)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    itemCount,
    subtotal,
    savings,
    total,
    addItem,
    removeItem,
    clearCart,
  }
})
