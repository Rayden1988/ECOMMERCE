<template>
  <main class="min-h-[calc(100vh-32px)] bg-[#f59e0b] px-0 pb-8 pt-0.5">
    <h1 class="px-0.5 text-xs font-medium leading-none text-zinc-800">Products</h1>

    <div v-if="loading.products">Loading</div>

    <div v-else class="mt-2 grid grid-cols-2 gap-x-24 gap-y-10 pl-0.5 pr-4">
      <div v-for="product in products" :key="product.id">
        <ProductCard :product="product" @add-item="addItem" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Product } from '@/router/model/product.model'
import { QueryParams } from '@/model/queryParams'
import { ProductRest } from '@/services/rest/product.rest'
import ProductCard from '@/components/Card/ProductCard.vue'
import { defineComponent } from 'vue'
import { useCartStore } from '@/stores/cart'

export default defineComponent({
  name: 'ProductsView',
  data() {
    return {
      rest: new ProductRest(),
      params: new QueryParams(),
      products: [] as Product[],
      loading: { products: false },
      cartStore: useCartStore(),
    }
  },

  methods: {
    getAllProducts() {
      this.loading.products = true

      this.rest
        .getAll(this.params)
        .then((res) => {
          this.products = res.data.data
          this.params.page = res.data.page
          this.params.limit = res.data.limit
        })
        .finally(() => (this.loading.products = false))
    },

    addItem(product: Product) {
      this.cartStore.addItem({
        product,
        quantity: 1,
      })

      this.cartStore.openCart()
    },
  },

  mounted() {
    this.getAllProducts()
  },

  components: { ProductCard },
})
</script>
