<template>
  <!-- <article class="w-[200px]">
    <h1>{{ product?.title }}</h1>
    <p>{{ product?.description }}</p>
    <p>R$:{{ product?.price.toFixed(2).replace('.', ',') }}</p>
    <button @click="addItem(product)">Adicionar</button>
  </article> -->
  <Card :style="{ width: '100%', minWidth: '200px', maxWidth: '220px' }">
    <template #header>
      <img :src="product?.imageUrl" class="w-full object-cover" />
    </template>

    <template #title>
      <h1>{{ product?.title }}</h1>
    </template>

    <template #content>
      <p>{{ product?.description }}</p>
      <p>R$:{{ product?.price.toFixed(2).replace('.', ',') }}</p>
      <button @click="addItem(product)">Adicionar</button>
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

  emits: ['onClick'],

  methods: {
    addItem(product: Product) {
      this.$emit('onClick', product)
    },
  },
})
</script>
