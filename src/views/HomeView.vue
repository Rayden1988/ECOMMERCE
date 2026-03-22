<script lang="ts">
import { Product } from '../model/product.model'
import ProductCard from '../components/Card/ProductCard.vue'
import { Cart } from '../model/cart.model'
import CartItem from '../components/Cart/CartItem.vue'

export default {
  data() {
    return {
      cart: new Cart(),
      products: [
        new Product('Guitarra', '22 trastes', 200, 0.05, '1'),
        new Product('Guitarra2', '22 trastes', 200, 0.05, '2'),
      ],
    }
  },

  methods: {
    addItem(item: Product) {
      this.cart.addItem(item)
    },

    goToDetail(product: Product) {
      const id = product.id
      this.$router.push({ path: `/products/${id}` })
    },

    decrementItem(item: Product) {
      this.cart.decrementItem(item)
    },

    removeItem(item: Product) {
      this.cart.removeItem(item)
    },
  },

  components: {
    ProductCard,
    CartItem,
  },
}
</script>

<template>
  <main>
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="item in products" :key="item.id" class="w-[200px] cursor-pointer" @click="goToDetail(item)">
        <ProductCard :product="item" @onClick="addItem" />
      </div>
    </section>
  </main>

  <div>
    <h1>Carrinho</h1>

    <div v-if="cart.list.length > 0" class="flex flex-col gap-4">
      <div v-for="item in cart.list" :key="item.product.id">
        <CartItem :item="item" @decrementItem="decrementItem" @removeItem="removeItem" />
      </div>
    </div>

    <div v-else class="border border-slate-500 bg-slate-400 h-64 w-1/2 flex items-center justify-center">
      <h1>Nao existe itens no carrinho. Vamos comprar?</h1>
    </div>

    <p>total: {{ cart.getTotalPrice() }}</p>
  </div>
</template>
