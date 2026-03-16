<script setup lang="ts">
import ProductCard from '@/components/Card/ProductCard.vue'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<template>
  <main>
    <ProductCard
      v-for="(product, index) in products"
      :key="`${product.title}-${index}`"
      :product="product"
      @add-to-cart="cart.addItem"
    />

    <div>
      <h1>Carrinho</h1>

      <div v-for="(item, index) in cart.items" :key="`${item.title}-${index}`">
        <h2>{{ item.title }}</h2>
      </div>

      <p>total: {{ cart.itemCount }}</p>
    </div>
  </main>
</template>
