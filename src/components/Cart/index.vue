<template>
  <h1 @click="toggle">Cart</h1>

  <article
    v-if="cartStore.show"
    class="absolute top-20 right-20 min-h-[40px] w-96 border bg-white p-4 shadow-sm"
  >
    <div v-if="cartStore.existItems">
      <div
        v-for="item in cartStore.items"
        :key="item.product.id"
        class="mb-2 border border-zinc-400 bg-[#d9d9d9] p-3 text-zinc-800"
      >
        <div class="text-sm font-normal leading-tight">
          {{ getItemTitle(item) }}
        </div>
        <div class="text-sm leading-tight">
          {{ formatCurrency(item.product.price) }}
        </div>
        <div class="text-sm leading-tight">
          {{ item.quantity }}
        </div>

        <div class="mt-2 flex items-center gap-2">
          <Button @click="decrement(item.product.id)">-</Button>
          <Button @click="add(item.product)">+</Button>
        </div>
      </div>
    </div>

    <div v-else class="bg-[#d9d9d9] p-3 text-sm leading-tight text-zinc-800">
      <h1>Nao existem itens no carrinho</h1>
    </div>
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

    add(product: Product) {
      const item = {
        product,
        quantity: 1,
      }

      this.cartStore.addItem(item)
    },

    decrement(id: string) {
      this.cartStore.decrementItem(id)
    },

    getItemTitle(item: ICartItem) {
      const product = item.product as Product & { name?: string }

      return product.title ?? product.name ?? ''
    },

    formatCurrency(price: number) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price)
    },
  },
})
</script>
