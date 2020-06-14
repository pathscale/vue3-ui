<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Field',
    props: {
      label: {
        type: String,
        default: null,
      },
    },
  })
</script>




