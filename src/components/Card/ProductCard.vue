<template>
  <!-- <article class="w-[200px]">
    <h1>{{ product?.title }}</h1>
    <p>{{ product?.description }}</p>
    <p>R$:{{ product?.price.toFixed(2).replace('.', ',') }}</p>
    <button @click="addItem(product)">Adicionar</button>
  </article> -->
  <Card class="overflow-hidden rounded-xl" :style="{ width: '100%', minWidth: '200px', maxWidth: '220px' }">
    <template #header>
      <img :src="mainImage" class="h-32 w-full object-cover" />
    </template>

    <template #title>
      <h1>{{ product?.title }}</h1>
    </template>

    <template #content>
      <p>{{ product?.description }}</p>
      <p>R$:{{ product?.price.toFixed(2).replace('.', ',') }}</p>
      <Button label="Adicionar" class="mt-3 w-full" @click.stop="addItem(product)" />
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

  emits: ['onClick', 'on-click'],

  methods: {
    addItem(product: Product) {
      this.$emit('onClick', product)
      this.$emit('on-click', product)
    },
  },
  computed: {
    mainImage(): string {
      return (
        this.product?.images?.find((i) => i.isMain)?.url ??
        this.product?.images?.[0]?.url ??
        this.product?.imageUrl ??
        'https://picsum.photos/200'
      )
    },
  },
})
</script>
