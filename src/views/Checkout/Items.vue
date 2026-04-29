<template>
  <section class="w-full max-w-md p-4">
    <h1 class="mb-4 text-lg font-semibold text-zinc-800">Itens do Pedido</h1>

    <div v-if="cartStore.existItems" class="space-y-2">
      <div
        v-for="item in cartStore.items"
        :key="item.product.id"
        class="rounded border border-zinc-300 bg-white p-3 text-sm text-zinc-800"
      >
        <div class="font-medium">
          {{ getItemTitle(item) }}
        </div>

        <div class="mt-1 text-zinc-600">Quantidade: {{ item.quantity }}</div>
      </div>
    </div>

    <div v-else class="rounded border border-zinc-300 bg-white p-3 text-sm text-zinc-600">
      Não existem itens no carrinho
    </div>

    <div class="mt-4 flex gap-2">
      <Button label="Retornar" severity="secondary" @click="goBack('1')" />
      <Button label="Finalizar Pedido" @click="finish" :disabled="!cartStore.existItems" />
    </div>
  </section>
</template>

<script lang="ts">
import type { ICartItem } from '@/model/cart.model'
import { Product } from '@/router/model/product.model'
import { useCartStore } from '@/stores/cart'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CheckoutItems',
  props: {
    previous: {
      type: Function as PropType<(view: string | number) => void>,
      required: false,
    },
  },
  emits: ['onFinish'],
  setup() {
    const cartStore = useCartStore()

    return { cartStore }
  },
  methods: {
    goBack(view: string | number) {
      this.previous?.(view)
    },

    finish() {
      this.$emit('onFinish')
    },

    getItemTitle(item: ICartItem) {
      const product = item.product as Product & { name?: string }

      return product.title ?? product.name ?? ''
    },
  },
})
</script>
