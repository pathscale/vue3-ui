<template>
  <div class="px-6 py-4">
    <p class="text-gray-700 text-base">
      <slot />
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CardFooter',
})
</script>
