<template>
  <main class="flex flex-col items-center justify-center min-h-screen">
    <h1>404 - Página não encontrada</h1>
    <button class="voltar" @click="goBack">Voltar</button>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    goBack() {
      this.$router.push('/')
    },
  },
})
</script>
