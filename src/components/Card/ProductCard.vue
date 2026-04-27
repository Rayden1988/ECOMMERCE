<template>
  <!-- <article class="w-[200px]">
    <h1>{{ product?.title }}</h1>
    <p>{{ product?.description }}</p>
    <p>R$:{{ product?.price.toFixed(2).replace('.', ',') }}</p>
    <button @click="addItem(product)">Adicionar</button>
  </article> -->
  <Card
    class="w-full overflow-hidden rounded-xl bg-white shadow-sm"
    :style="{ minWidth: '200px', maxWidth: '220px', minHeight: '410px' }"
  >
    <template #header>
      <img :src="mainImage" class="h-56 w-full object-cover" />
    </template>

    <template #title>
      <h1 class="mb-1 text-base font-medium leading-tight text-zinc-900">
        {{ product?.title ?? (product as any)?.name }}
      </h1>
    </template>

    <template #content>
      <div class="flex h-full flex-col gap-1">
        <p class="max-w-[18ch] text-sm leading-snug text-zinc-500">
          {{ product?.description ?? (product as any)?.shortDescription }}
        </p>
        <p class="text-sm leading-snug text-zinc-700">
          R$:{{ product?.price.toFixed(2).replace('.', ',') }}
        </p>
        <Button
          label="Adicionar"
          size="small"
          class="mt-4 w-full self-end"
          @click.stop="addItem(product)"
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
