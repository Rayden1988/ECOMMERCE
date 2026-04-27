<template>
  <div class="relative">
    <button
      type="button"
      class="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white transition hover:bg-white/20"
      @click="toggleMenu"
    >
      {{ userName }}
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-20 mt-2 w-40 rounded-lg border border-white/10 bg-zinc-900 p-2 shadow-lg"
    >
      <button
        type="button"
        class="w-full rounded-md px-3 py-2 text-left text-sm text-white transition hover:bg-white/10"
        @click="logout"
      >
        Sair
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'UserMenu',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const open = ref(false)

    const userName = computed(() => {
      return authStore.user?.name?.trim() || 'Ola'
    })

    function toggleMenu() {
      open.value = !open.value
    }

    function logout() {
      authStore.logout()
      open.value = false
      router.push('/login')
    }

    return {
      open,
      userName,
      toggleMenu,
      logout,
    }
  },
})
</script>
