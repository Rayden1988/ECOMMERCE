<template>
  <div>
    <Card :style="{ width: '100%', minWidth: '200px', maxWidth: '420px' }">
      <template #content>
        <div class="flex flex-row gap-2 items-center">
          <img :src="item.product.imageUrl" class="w-28" />
          <div class="flex-1 px-4">
            <h3>{{ item.product.title }}</h3>
            <p>{{ item.product.getPrice() }}</p>
            <span class="flex items-center gap-2">
              {{ item.quantity }}
              <Button @click="decrementItem" label="-" />
            </span>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-row-reverse">
          <Button @click="removeItem" label="Deletar" />
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
