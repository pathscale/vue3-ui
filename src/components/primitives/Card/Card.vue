<template>
  <div
    class="py-4 px-4"
    :class="`bg-grey-700 max-w-sm rounded overflow-hidden shadow-lg bg-opacity-90`">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Card',
})
</script>
