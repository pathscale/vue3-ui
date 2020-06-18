<template>
  <div class="bg-teal-500 py-6 px-6 flex">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Appbar',
})
</script>
