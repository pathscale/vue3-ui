<template>
  <div class="py-2 px-2">
    <p class="text-gray-700 text-base">
      <slot />
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CardBody',
})
</script>
