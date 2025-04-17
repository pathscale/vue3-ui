<script>
import { computed } from 'vue'

export default {
  name: 'VContainer',
  props: {
    type: String,
    bg: Object,
  },
  setup(props) {
    const rootClasses = computed(() => {
      return [ props.bg ? {
        'background-image': `url(${props.bg})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
      } : {}]
    })
    return { rootClasses }
  }
}
</script>

<template>
  <div
    class="container"
    :class="[type]"
    :style="rootClasses">
    <slot />
  </div>
</template>
