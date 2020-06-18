<template>
  <div class="mx-2">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CardTitle',
})
</script>
