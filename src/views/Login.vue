<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts">
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Erro from '@/components/Erro.vue'
import { LoginRest } from '@/services/rest/login.rest'
import { useAuthStore } from '@/stores/auth'

type VuelidateState = {
  $validate: () => Promise<boolean> | boolean
  $invalid: boolean
}

type LoginResponse = {
  data?: {
    user?: {
      role?: 'ADMIN' | 'CUSTOMER'
    }
    tokens?: {
      accessToken?: string
      refreshToken?: string
    }
  }
  user?: {
    role?: 'ADMIN' | 'CUSTOMER'
  }
  tokens?: {
    accessToken?: string
    refreshToken?: string
  }
}

export default defineComponent({
  name: 'LoginView',
  components: {
    InputText,
    Password,
    Button,
    Erro,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rest: new LoginRest(),
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
        email: {
          required: helpers.withMessage('Campo obrigatorio', required),
          email: helpers.withMessage('Email invalido', email),
        },
        password: {
          required: helpers.withMessage('Campo obrigatorio', required),
        },
      },
    }
  },
  methods: {
    async login() {
      const v$ = this.v$ as unknown as VuelidateState
      const authStore = this.authStore as ReturnType<typeof useAuthStore>

      this.v$.$touch()

      const isValid = await v$.$validate()
      if (!isValid) return

      this.loading = true

      try {
        const response = (await this.rest.login({
          email: this.form.email,
          password: this.form.password,
        })) as LoginResponse

        const payload = response as any
        const user = payload?.data?.user ?? payload?.user
        const tokens = payload?.data?.tokens ?? payload?.tokens

        if (!user || !tokens?.accessToken || !tokens?.refreshToken) {
          throw new Error('Resposta de login sem user/tokens')
        }

        authStore.setUser(user as any)
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
          'Erro ao fazer login.'

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
        @submit.prevent="login"
      >
        <header class="pb-1 text-[10px] text-[#c7cdd4]">Faca seu login</header>

        <label class="flex flex-col gap-1 text-[9px] text-[#a7afb7]">
          email
          <InputText
            v-model="form.email"
            type="email"
            class="w-full"
            input-class="w-full h-5 text-[10px] rounded-none"
          />
          <Erro :value="v$.form" field="email" />
        </label>

        <label class="flex flex-col gap-1 text-[9px] text-[#a7afb7]">
          password
          <Password
            v-model="form.password"
            :feedback="false"
            toggle-mask
            class="w-full"
            input-class="w-full h-5 text-[10px] rounded-none"
          />
          <Erro :value="v$.form" field="password" />
        </label>

        <Button
          type="submit"
          label="Entrar"
          :loading="loading"
          :disabled="loading"
          class="mt-1 h-5 w-full rounded-none! border-[#45dfba]! bg-[#45dfba]! text-[9px]! text-[#06221c]!"
        />
      </form>
    </section>
  </main>
</template>
