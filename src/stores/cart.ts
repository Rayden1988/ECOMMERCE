import type { ICartItem } from '@/model/cart.model'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'ecommerce-cart'

function loadCartItems(): ICartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return []

    const parsed = JSON.parse(raw) as ICartItem[]

    if (!Array.isArray(parsed)) return []

    return parsed
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      items: loadCartItems(),
      show: false,
    }
  },

  getters: {
    total(state) {
      return state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    },
    existItems(state) {
      return state.items.length > 0
    },
  },

  actions: {
    persistCart() {
      if (typeof window === 'undefined') return

      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },

    addItem(item: ICartItem) {
      const existingItem = this.items.find((i) => i.product.id === item.product.id)

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push(item)
      }

      this.persistCart()
    },

    toggleShow() {
      this.show = !this.show
    },

    openCart() {
      this.show = true
    },

    closeCart() {
      this.show = false
    },

    decrementItem(productId: string) {
      if (!productId) return

      const existingItem = this.items.find((i) => i.product.id === productId)

      if (existingItem) {
        this.items = this.items
          .map((i) => {
            if (i.product.id === productId) {
              if (i.quantity === 1) {
                return null
              } else {
                return { ...i, quantity: i.quantity - 1 }
              }
            }

            return i
          })
          .filter((i) => i != null) as ICartItem[]

        this.persistCart()
      }
    },

    removeItem(productId: string): void {
      if (!productId) return

      this.items = this.items.filter((i) => i.product.id !== productId)
      this.persistCart()
    },
  },
})
