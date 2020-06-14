<template>
  <button
    :type="type"
    :disabled="disabled"
    class="button"
    :class="[{
      'is-success': success,
    }]"
    >
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Button',
    props: {
      type: {
        type: String,
        default: 'button'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      success: {
        type: Boolean,
        default: false
      }
    },
})
</script>
