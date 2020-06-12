<template>
  <div class="p-5">
    <div
      class="mr-4 flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-gray-700 bg-gray-100 border border-gray-300">
      <div
        class="text-xs font-normal leading-none max-w-full flex-initial">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Chip',
})
</script>

<style scoped></style>
