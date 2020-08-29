<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VContainer',
  props: {
    type: {
      type: String,
      default: ''
    },
    bg: {
      type: Object,
      default: null,
  }
}
})
</script>

<template>
  <div
    class="container"
    :class="[type]"
    :style="[ bg ? {
      'background-image': `url(${bg})`,
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
    } : {}]">
    <slot />
  </div>
</template>
