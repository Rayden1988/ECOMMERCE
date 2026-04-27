<template>
  <h1 @click="toggle">Cart</h1>

  <article v-if="show">
    <div v-for="item in cartStore.items" :key="item.product.id">
      <div class="border p-4">
        <h5>{{ item.product.title }}</h5>
        <p>{{ item.product.price }}</p>
        <span>{{ item.quantity }}</span>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { useCartStore } from '@/stores/cart'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CartItem',
  setup() {
    const cartStore = useCartStore()

    return { cartStore }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
  },
})
</script>
