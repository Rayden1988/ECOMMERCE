<template>
  <div v-if="product?.id">
    <ProductCard :product="product" />
  </div>
  <div v-else>Nao existe esse produto</div>
</template>

<script lang="ts">
import ProductCard from '@/components/Card/ProductCard.vue'
import { Product } from '@/router/model/product.model'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      productId: this.$route.params.id,
      product: {} as Product | undefined,
    }
  },
  components: {
    ProductCard,
  },
  methods: {
    getProduct() {
      const product = [new Product('1', 'Guitarra', 'desc', 200, 0.2)].find(
        (p) => p.id === this.productId,
      )
      console.log(product)

    },
  },
  mounted() {
    this.getProduct(

    )
  },
})
</script>
