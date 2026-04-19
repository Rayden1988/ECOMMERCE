<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts">
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { email, helpers, maxLength, minLength, required, sameAs } from '@vuelidate/validators'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Erro from '@/components/Erro.vue'
import { RegisterForm } from '@/model/register.form'
import { RegisterRest } from '@/services/rest/register.rest'
import { useAuthStore } from '@/stores/auth'

type VuelidateState = {
  $validate: () => Promise<boolean> | boolean
  $invalid: boolean
}

export default defineComponent({
  name: 'RegisterView',
  components: {
    InputText,
    Password,
    Button,
    Erro,
  },
  data() {
    return {
      form: new RegisterForm(),
      field: {
        name: 'name',
        email: 'email',
        password: 'password',
        confirm: 'confirmPassword',
      },
      rest: new RegisterRest(),
      loading: false,
    }
  },
  setup() {
    const authStore = useAuthStore()
    return {
      authStore,
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage('Campo obrigatorio', required),
          minLength: helpers.withMessage('Minimo de 2 caracteres', minLength(2)),
          maxLength: helpers.withMessage('Maximo de 199 caracteres', maxLength(199)),
        },
        email: {
          required: helpers.withMessage('Campo obrigatorio', required),
          email: helpers.withMessage('Email invalido', email),
        },
        password: {
          required: helpers.withMessage('Campo obrigatorio', required),
          minLength: helpers.withMessage('Minimo de 8 caracteres', minLength(8)),
          maxLength: helpers.withMessage('Maximo de 72 caracteres', maxLength(72)),
        },
        confirmPassword: {
          required: helpers.withMessage('Campo obrigatorio', required),
          sameAs: helpers.withMessage('As senhas precisam ser iguais', sameAs(this.form.password)),
        },
      },
    }
  },
  methods: {
    async register() {
      const v$ = this.v$ as unknown as VuelidateState
      const authStore = this.authStore as ReturnType<typeof useAuthStore>

      this.v$.$touch()

      const isValid = await v$.$validate()
      if (!isValid) return

      const body = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      }

      this.loading = true

      try {
        const response = await this.rest.register(body)

        const payload = response?.data ?? response
        const user = payload?.data?.user ?? payload?.user
        const tokens = payload?.data?.tokens ?? payload?.tokens ?? payload?.token

        if (!user || !tokens?.accessToken || !tokens?.refreshToken) {
          throw new Error('Resposta de cadastro sem user/tokens')
        }

        authStore.setUser(user)
        authStore.setAccessToken(tokens.accessToken)
        authStore.setRefreshToken(tokens.refreshToken)

        if (user.role === 'CUSTOMER') {
          this.$router.push({ path: '/history' })
        } else if (user.role === 'ADMIN') {
          this.$router.push({ path: '/admin' })
        }
      } catch (e: any) {
        console.error(e)

        const apiMessage =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          'Erro ao cadastrar.'

        alert(apiMessage)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>

<template>
  <main
    class="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#04080d]"
  >
    <div class="pointer-events-none absolute left-0 top-0 h-full w-8.5 bg-[#2a4a3b]/45"></div>
    <div class="pointer-events-none absolute right-0 top-0 h-full w-8.5 bg-[#2a4a3b]/45"></div>

    <section class="flex h-[74vh] w-[78vw] items-center justify-center bg-[#03070b]">
      <form
        class="flex w-44.5 flex-col gap-1.5 border border-[#3a4046] bg-[#060b10] p-2.5"
        novalidate
        @submit.prevent="register"
      >
        <header class="pb-1 text-[10px] text-[#c7cdd4]">Faca seu registro</header>

        <label class="flex flex-col gap-1 text-[9px] text-[#a7afb7]">
          {{ field.name }}
          <InputText
            v-model="form.name"
            type="text"
            class="w-full"
            input-class="w-full h-5 text-[10px] rounded-none"
          />
          <Erro :value="v$.form" field="name" />
        </label>

        <label class="flex flex-col gap-1 text-[9px] text-[#a7afb7]">
          {{ field.email }}
          <InputText
            v-model="form.email"
            type="email"
            class="w-full"
            input-class="w-full h-5 text-[10px] rounded-none"
          />
          <Erro :value="v$.form" field="email" />
        </label>

        <label class="flex flex-col gap-1 text-[9px] text-[#a7afb7]">
          {{ field.password }}
          <Password
            v-model="form.password"
            :feedback="false"
            toggle-mask
            class="w-full"
            input-class="w-full h-5 text-[10px] rounded-none"
          />
          <Erro :value="v$.form" field="password" />
        </label>

        <label class="flex flex-col gap-1 text-[9px] text-[#a7afb7]">
          {{ field.confirm }}
          <Password
            v-model="form.confirmPassword"
            :feedback="false"
            toggle-mask
            class="w-full"
            input-class="w-full h-5 text-[10px] rounded-none"
          />
          <Erro :value="v$.form" field="confirmPassword" />
        </label>

        <Button
          type="submit"
          label="Registrar"
          :loading="loading"
          :disabled="loading"
          class="mt-1 h-5 w-full rounded-none! border-[#45dfba]! bg-[#45dfba]! text-[9px]! text-[#06221c]!"
        />
      </form>
    </section>
  </main>
</template>
