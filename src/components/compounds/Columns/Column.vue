<script>
import { computed } from 'vue'

export default {
  name: 'VColumn',
  props: {
    size: String,
    offset: String,
    narrow: Boolean,
    narrowBreakpoint: String
  },
  setup(props) {
    const computedClasses = computed(() => [
      props.size,
      props.offset,
      props.narrowBreakpoint,
      {
        'is-narrow': props.narrow
      }
    ])

    return { computedClasses }
  }
}
</script>

<template>
  <div class="column" :class="computedClasses">
    <slot />
  </div>
</template>
