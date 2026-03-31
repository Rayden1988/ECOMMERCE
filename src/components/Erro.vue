<template>
  <span v-if="resolvedErrors.length > 0" class="mt-0.5">
    <p
      v-for="(error, index) in resolvedErrors"
      :key="error.$uid ?? index"
      class="text-[9px] leading-tight text-[#ff7b7b]"
    >
      {{ getErrorMessage(error) }}
    </p>
  </span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type VuelidateError = {
  $uid?: string | number
  $message?: string
  $validator?: string
}

type FieldValidation = {
  $errors?: VuelidateError[]
}

type VuelidateShape = Record<string, FieldValidation> & {
  form?: Record<string, FieldValidation>
}

export default defineComponent({
  name: 'ErroComponent',
  props: {
    value: {
      type: Object as PropType<VuelidateShape>,
      required: false,
      default: () => ({}),
    },
    field: {
      type: String,
      required: true,
    },
  },
  computed: {
    resolvedErrors(): VuelidateError[] {
      const directField = this.value?.[this.field]
      const nestedField = this.value?.form?.[this.field]
      return directField?.$errors ?? nestedField?.$errors ?? []
    },
  },
  methods: {
    getErrorMessage(error: VuelidateError) {
      const byValidator: Record<string, string> = {
        required: 'Campo obrigatorio',
        minLength: 'Valor muito curto',
        maxLength: 'Valor muito longo',
        email: 'Email invalido',
        sameAs: 'As senhas precisam ser iguais',
      }

      const mapped = byValidator[error.$validator ?? '']
      if (mapped) return mapped

      const rawMessage = String(error.$message ?? '').toLowerCase()
      if (rawMessage.includes('required')) return 'Campo obrigatorio'
      if (rawMessage.includes('at least')) return 'Valor muito curto'
      if (rawMessage.includes('at most')) return 'Valor muito longo'
      if (rawMessage.includes('email')) return 'Email invalido'

      return 'Campo invalido'
    },
  },
})
</script>
