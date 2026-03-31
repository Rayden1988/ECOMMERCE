<template>
  <div class="flex min-h-screen flex-row bg-[#03070b] text-zinc-100">
    <aside class="flex 20.5 flex-col bg-[#9f4608] px-3 pt-6">
      <button
        v-for="item in items"
        :key="item.label"
        class="text-left text-"
        :class="isActive(item.path) ? 'text-white' : 'text-zinc-200/90'"
        @click="item.command()"
      >
        {{ item.label }}
      </button>
    </aside>

    <main class="flex-1 p-2">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      items: [
        {
          label: 'Dashboard',
          path: '/admin/dashboard',
          command: () => this.$router.push('/admin/dashboard'),
        },
        {
          label: 'Products',
          path: '/admin/products',
          command: () => this.$router.push('/admin/products'),
        },
      ],
    }
  },
  methods: {
    isActive(path: string) {
      return this.$route.path === path
    },
  },
})
</script>
