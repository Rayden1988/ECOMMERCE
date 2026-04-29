<template>
  <form class="w-full max-w-4xl p-4" @submit.prevent="submitAddress">
    <h1 class="mb-4 text-lg font-semibold text-zinc-800">Endereco</h1>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <label class="grid gap-1 text-sm text-zinc-700">
        Cidade
        <InputText v-model="shippingAddress.city" class="w-full" />
      </label>

      <label class="grid gap-1 text-sm text-zinc-700">
        Rua
        <InputText v-model="shippingAddress.street" class="w-full" />
      </label>

      <label class="grid gap-1 text-sm text-zinc-700">
        Complemento
        <InputText v-model="shippingAddress.complement" class="w-full" />
      </label>

      <label class="grid gap-1 text-sm text-zinc-700">
        País
        <InputText v-model="shippingAddress.country" class="w-full" />
      </label>

      <label class="grid gap-1 text-sm text-zinc-700">
        Bairro
        <InputText v-model="shippingAddress.neighborhood" class="w-full" />
      </label>

      <label class="grid gap-1 text-sm text-zinc-700">
        Número
        <InputText v-model="shippingAddress.number" class="w-full" />
      </label>

      <label class="grid gap-1 text-sm text-zinc-700">
        Estado
        <InputText v-model="shippingAddress.state" class="w-full" />
      </label>

      <label class="grid gap-1 text-sm text-zinc-700">
        CEP
        <InputText v-model="shippingAddress.zipCode" class="w-full" />
      </label>
    </div>

    <div class="mt-4 flex justify-center md:justify-start">
      <Button class="w-full md:w-64" label="Proximo" type="submit" />
    </div>
  </form>
</template>

<script lang="ts">
import { ShippingAddress } from '@/model/shippingAddress.model'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CheckoutAddress',
  emits: ['onNext'],
  props: {
    next: {
      type: Function as PropType<(view: string | number) => void>,
      required: false,
    },
  },
  data() {
    return {
      shippingAddress: new ShippingAddress(),
    }
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      shippingAddress: {
        city: { required: helpers.withMessage('Campo obrigatorio', required) },
        street: { required: helpers.withMessage('Campo obrigatorio', required) },
        complement: {},
        country: { required: helpers.withMessage('Campo obrigatorio', required) },
        neighborhood: { required: helpers.withMessage('Campo obrigatorio', required) },
        number: { required: helpers.withMessage('Campo obrigatorio', required) },
        state: { required: helpers.withMessage('Campo obrigatorio', required) },
        zipCode: { required: helpers.withMessage('Campo obrigatorio', required) },
      },
    }
  },
  methods: {
    async submitAddress() {
      const v$ = this.v$ as unknown as { $touch: () => void; $validate: () => Promise<boolean> }

      this.v$.$touch()
      const isValid = await v$.$validate()

      if (!isValid) return

      this.$emit('onNext', this.shippingAddress)
      this.next?.('2')
    },
  },
})
</script>
