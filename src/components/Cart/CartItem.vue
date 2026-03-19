<template>
  <div>
    <!-- <h3>{{ item.product.title }}</h3>
    <p>{{ item.product.getPrice() }}</p>
    <span>
      {{ item.quantity }} <button @click="onDecrementItem(item.product)">{{ ' - ' }}</button>
    </span>
    <button @click="onRemoveItem(item.product)">Deletar</button> -->
    <Card :style="{ width: '100%', minWidth: '200px', maxWidth: '420px' }">
      <template #content>
        <div class="flex flex-row gap-2">
          <img :src="'https://picsum.photos/200'" class="w-28" />
          <h3 class="flex-1 px-4">{{ item.product.title }}</h3>
          <p>{{ item.product.getPrice() }}</p>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-row-reverse">
          <Button @click="removeItem">Deletar</Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Product } from '@/router/model/product.model'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<{ product: Product; quantity: number }>,
      required: true,
    },
  },

  emits: ['decrementItem', 'removeItem'],

  methods: {
    decrementItem() {
      this.$emit('decrementItem', this.item.product)
    },
    removeItem() {
      this.$emit('removeItem', this.item.product)
    },
  },
})
</script>
