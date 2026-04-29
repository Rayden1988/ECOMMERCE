<template>
  <Card class="w-full overflow-hidden rounded-xl bg-[#151515] shadow-xl" :style="{ minWidth: '200px', maxWidth: '220px', minHeight: '410px' }">
    <template #header>
      <img :src="mainImage" class="h-56 w-full object-cover" />
    </template>

    <template #title>
      <h1 class="mb-1 text-center text-base font-medium leading-tight text-white">
        {{ product?.title ?? (product as any)?.name }}
      </h1>
    </template>

    <template #content>
      <div class="flex h-full flex-col gap-1 px-3 pb-3">
        <p class="max-w-[18ch] text-sm leading-snug text-zinc-400">
          {{ product?.description ?? (product as any)?.shortDescription }}
        </p>
        <p class="text-sm leading-snug text-zinc-400">
          R$ {{ product?.price.toFixed(2).replace('.', ',') }}
        </p>
        <Button
          label="adicionar"
          type="button"
          size="small"
          class="mt-4 w-full self-end border-[#3dd79f]! bg-[#3dd79f]! text-black!"
          @click="addItem(product)"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { Product } from '@/router/model/product.model'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  emits: ['add-item'],

  methods: {
    addItem(product: Product) {
      this.$emit('add-item', product)
    },
  },

  computed: {
    mainImage(): string {
      return (
        this.product?.imageUrl ??
        this.product?.images?.find((i) => i.isMain)?.url ??
        this.product?.images?.[0]?.url ??
        'https://picsum.photos/200'
      )
    },
  },
})
</script>
