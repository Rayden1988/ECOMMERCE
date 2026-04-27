<template>
  <div class="flex min-h-screen flex-col bg-[#efefef]">
    <Menubar :model="items" class="border-0 bg-[#d9d9d9] px-3 py-1 text-zinc-700">
      <template #end>
        <div class="flex items-center gap-4 text-sm leading-none">
          <CartComponent />
          <span>Ola Raydrocha</span>
        </div>
      </template>
    </Menubar>

    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menubar from 'primevue/menubar'
import CartComponent from '@/components/Cart/index.vue'

export default defineComponent({
  components: { Menubar, CartComponent },
  data() {
    return {
      items: [
        {
          label: 'Home',
          command: () => this.$router.push('/'),
        },
        {
          label: 'Produtos',
          command: () => this.$router.push('/products'),
        },
      ],
    }
  },
})
</script>

<style scoped>
:deep(.p-menubar) {
  border-radius: 0;
  min-height: 32px;
}

:deep(.p-menubar-root-list) {
  align-items: flex-start;
}

:deep(.p-menubar-item-link) {
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  color: #3f3f46;
}

:deep(.p-menubar-item-label) {
  line-height: 1;
  transform: translateY(-1px);
  font-size: 0.92rem;
}
</style>
