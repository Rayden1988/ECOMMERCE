<template>
  <button type="button" class="flex cursor-pointer select-none items-center gap-1 text-sm leading-none" @click="toggle">
    <span class="relative inline-flex h-4 w-4 items-center justify-center">
      <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path
          d="M7 4h-2l-1 2H1v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 7 20h12v-2H7.42a.25.25 0 0 1-.22-.37L8 16h7.55a2 2 0 0 0 1.79-1.11L21 7H6.42L7 4zm3.3 9 1.1-5h7.1l-2.4 5H10.3z"
        />
      </svg>
      <span
        v-if="cartStore.totalQuantity > 0"
        class="absolute -right-2 -top-2 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-semibold leading-none text-white"
      >
        {{ cartStore.totalQuantity }}
      </span>
    </span>
    <span>Cart</span>
  </button>

  <article
    v-if="cartStore.show"
    class="absolute top-12 right-4 z-50 w-75 overflow-hidden rounded border border-zinc-300 bg-white shadow-lg"
  >
    <header class="flex items-center justify-between bg-[#f59e0b] px-3 py-2 text-sm font-semibold text-white">
      <span>Seu Carrinho</span>
      <button type="button" class="text-lg leading-none text-white" @click="close">×</button>
    </header>

    <div v-if="cartStore.existItems" class="max-h-72 overflow-auto p-2.5">
      <div
        v-for="item in cartStore.items"
        :key="item.product.id"
        class="mb-2.5 flex items-center gap-2.5 border-b border-zinc-200 pb-2.5 last:mb-0 last:border-b-0 last:pb-0"
      >
        <img :src="getItemImage(item)" :alt="getItemTitle(item)" class="h-10 w-10 rounded object-cover" />

        <div class="flex flex-1 items-center justify-between gap-2 text-sm text-zinc-800">
          <div class="min-w-0">
            <div class="truncate font-medium leading-tight">
              {{ getItemTitle(item) }}
            </div>
            <div class="text-xs font-semibold text-[#f59e0b]">
              R$ {{ formatPrice(item.product.price) }}
            </div>
          </div>

          <div class="flex items-center gap-1.5">
            <Button size="small" class="h-6 w-6 p-0" @click="decrement(item.product.id)">-</Button>
            <span class="w-5 text-center text-sm">{{ item.quantity }}</span>
            <Button size="small" class="h-6 w-6 p-0" @click="add(item.product)">+</Button>
            <Button size="small" severity="danger" class="h-6 w-6 p-0" @click="remove(item.product.id)">
              🗑
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center text-zinc-500">
      <svg viewBox="0 0 24 24" class="h-12 w-12 text-zinc-300" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 4h-2l-1 2H1v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 7 20h12v-2H7.42a.25.25 0 0 1-.22-.37L8 16h7.55a2 2 0 0 0 1.79-1.11L21 7H6.42L7 4zm3.3 9 1.1-5h7.1l-2.4 5H10.3z"
        />
      </svg>
      <div class="text-sm font-semibold text-zinc-600">
        Carrinho Vazio
      </div>
      <p class="max-w-52 text-xs leading-snug text-zinc-500">
        Adicione produtos para começar suas compras
      </p>
    </div>

    <footer class="border-t border-zinc-200 p-2.5">
      <div class="mb-2.5 flex items-center justify-between text-sm font-medium text-zinc-800">
        <span>Total:</span>
        <span class="text-base font-semibold text-[#f59e0b]">{{ formatPrice(cartStore.total) }}</span>
      </div>

      <Button label="Ir para Checkout" class="w-full" @click="goToCheckout" />
    </footer>
  </article>
</template>

<script lang="ts">
import type { ICartItem } from '@/model/cart.model'
import { Product } from '@/router/model/product.model'
import { useCartStore } from '@/stores/cart'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CartItem',
  setup() {
    const cartStore = useCartStore()

    return { cartStore }
  },
  methods: {
    toggle() {
      this.cartStore.toggleShow()
    },

    close() {
      this.cartStore.closeCart()
    },

    goToCheckout() {
      this.cartStore.closeCart()
      this.$router.push('/checkout')
    },

    add(product: Product) {
      this.cartStore.addItem({
        product,
        quantity: 1,
      })
    },

    decrement(id: string) {
      this.cartStore.decrementItem(id)
    },

    remove(id: string) {
      this.cartStore.removeItem(id)
    },

    getItemTitle(item: ICartItem) {
      const product = item.product as Product & { name?: string }

      return product.title ?? product.name ?? ''
    },

    getItemImage(item: ICartItem) {
      const product = item.product as Product & { imageUrl?: string; images?: Array<{ url: string; isMain?: boolean }> }

      return (
        product.imageUrl ??
        product.images?.find((i) => i.isMain)?.url ??
        product.images?.[0]?.url ??
        'https://picsum.photos/seed/cart/80/80'
      )
    },

    formatPrice(price: number) {
      return price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
  },
})
</script>
