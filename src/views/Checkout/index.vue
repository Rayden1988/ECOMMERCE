<template>
  <div class="flex h-screen justify-center bg-white">
    <Stepper value="1" class="w-full max-w-4xl px-4 pt-4">
      <StepList>
        <Step value="1">Endereco</Step>
        <Step value="2">Itens do Pedido</Step>
      </StepList>

      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <Address :next="activateCallback" @onNext="setAddress" />
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" value="2">
          <Items :previous="activateCallback" @onFinish="sendOrder" />
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<script lang="ts">
import { Order } from '@/model/order.model'
import { ShippingAddress } from '@/model/shippingAddress.model'
import { useCartStore } from '@/stores/cart'
import { defineComponent } from 'vue'
import Items from './Items.vue'
import Address from './Address.vue'
import { CheckoutService } from './checkout.service'

export default defineComponent({
  name: 'CheckoutIndex',
  components: { Items, Address },
  data() {
    return {
      form: {
        order: new Order(),
      },
      view: 1,
      address: new ShippingAddress(),
      service: new CheckoutService(),
    }
  },
  setup() {
    return {
      cartStore: useCartStore(),
    }
  },
  methods: {
    goTo(view: number) {
      this.view = view
    },

    setAddress(address: ShippingAddress) {
      this.address = address
      this.form.order.shippingAddress = address
    },

    async sendOrder() {
      this.form.order.items = this.cartStore.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }))
      this.form.order.shippingAddress = this.address
      this.form.order.successUrl = `${window.location.origin}/orders`
      this.form.order.cancelUrl = `${window.location.origin}/checkout`

      const response = await this.service.createOrder(this.form.order)
      const checkoutUrl = response?.data?.checkoutUrl ?? response?.checkoutUrl

      if (checkoutUrl) {
        window.location.href = checkoutUrl
        return
      }

      this.cartStore.clearCart()
      this.$router.push('/orders')
    },
  },
})
</script>
