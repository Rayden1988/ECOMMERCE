<template>
  <div class="flex min-h-screen flex-col bg-black">
    <menu class="flex flex-row items-center gap-4 p-4 text-white">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/products">Produtos</RouterLink>
    </menu>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      items: [],
    }
  },
})
</script>
