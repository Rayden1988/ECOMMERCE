<template>
  <article>
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
    <p>R$: {{ product.price.toFixed(2).replace('.', ',') }}</p>
    <button @click="addItem">Adicionar</button>
  </article>
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
    addItem() {
      this.$emit('onClick', this.product)
    },
  },
})
</script>
