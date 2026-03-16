<script lang="ts">
import { Product } from './router/model/product.model'
import ProductCard from './components/Card/ProductCard.vue'

export default {
  data() {
    return {
      cart: {
        list: [] as { product: Product; quantity: number }[],
        total: 0,
      },
      products: [
        new Product('Guitarra', '22 trastes', 200, 0.05),
        new Product('Guitarra2', '22 trastes', 200, 0.05),
      ],
    }
  },
  methods: {
    addItem(product: Product) {
      const existItem = this.cart.list.some((item) => item.product.title === product.title)

      if (existItem) {
        this.cart.list = this.cart.list.map((item) => {
          if (item.product.title === product.title) {
            return {
              product: item.product,
              quantity: item.quantity + 1,
            }
          }

          return item
        })

        this.cart.total += 1
      } else {
        this.cart.list.push({
          product,
          quantity: 1,
        })

        this.cart.total += 1
      }
    },

    decItem() {
      this.cart.total -= 1
    },
  },
  components: {
    ProductCard,
  },
}
</script>

<template>
  <main>
    <div v-for="product in products" :key="product.title">
      <ProductCard :product="product" @onClick="addItem" />
    </div>
  </main>

  <div>
    <h1>Carrinho</h1>

    <div v-for="item in cart.list" :key="item.product.title">
      <h1>{{ item.product.title }}</h1>
      <p>{{ item.quantity }}</p>
    </div>

    <p>total: {{ cart.total }}</p>
  </div>
</template>
