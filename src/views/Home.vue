<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from '@/router/model/product.model'
import ProductCard from '@/components/Card/ProductCard.vue'
import CartItem from '@/components/Cart/CartItem.vue'
import { ProductRest } from '@/services/rest/product.rest'

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      cart: {
        list: [] as { product: Product; quantity: number }[],
        total: 0,
      },
      rest: new ProductRest(),
      products: [] as Product[],
    }
  },
  methods: {
    getProducts() {
      const params = { page: 1, limit: 10, isActive: true }
      this.rest.getAll(params).then((res) => {
        this.products = res.data.data
        console.log(this.products, 'products')
      })
    },

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

    decrementItem(product: Product) {
      const item = this.cart.list.find((cartItem) => cartItem.product.title === product.title)

      if (!item) {
        return
      }

      if (item.quantity === 1) {
        this.removeItem(product)
        return
      }

      this.cart.list = this.cart.list.map((cartItem) => {
        if (cartItem.product.title === product.title) {
          return {
            product: cartItem.product,
            quantity: cartItem.quantity - 1,
          }
        }

        return cartItem
      })

      this.decItem()
    },

    removeItem(product: Product) {
      const item = this.cart.list.find((cartItem) => cartItem.product.title === product.title)

      if (!item) {
        return
      }

      this.cart.list = this.cart.list.filter((cartItem) => cartItem.product.title !== product.title)
      this.cart.total -= item.quantity
    },

    goToDetail(product: Product) {
      const id = product.id
      this.$router.push({ path: `/products/${id}` })
    },
  },

  components: {
    ProductCard,
    CartItem,
  },

  mounted() {
    this.getProducts()
  },
})
</script>

<template>
  <main>
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="product in products" :key="product.id">
        <div @click="goToDetail(product)">
          <ProductCard :product="product" @on-click="addItem" />
        </div>
      </div>
    </section>
  </main>

  <div>
    <h1 class="text-3xl font-semibold">Carrinho</h1>

    <div v-if="cart.list.length > 0" class="flex flex-col gap-4">
      <div v-for="item in cart.list" :key="item.product.title">
        <CartItem :item="item" @decrementItem="decrementItem" @removeItem="removeItem" />
      </div>
    </div>

    <div
      v-else
      class="border border-slate-500 bg-slate-400 h-64 w-1/2 flex items-center justify-center"
    >
      <h1>Nao existe itens no carrinho. Vamos comprar?</h1>
    </div>

    <p>total: R$ {{ cart.total.toFixed(2).replace('.', ',') }}</p>
    <Button label="Primevue" />
  </div>
</template>
