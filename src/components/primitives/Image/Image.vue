<script>
import { computed } from 'vue'

export default {
  name: 'VImage',
  inheritAttrs: false,
  props: {
    size: String,
    radio: String,
    rounded: Boolean,
    centered: Boolean
  },
  setup(props) {
    const figureClasses = computed(() => {
      return [
        props.size,
        props.radio,
        {
          'container': props.centered
        }
      ]
    })
    const imgClasses = computed(() => {
      return {
        'is-rounded': props.rounded
      }
    })
    return { figureClasses, imgClasses }
  }
}
</script>

<template>
  <figure class="image" :class="figureClasses">
    <img v-bind="$attrs" :class="imgClasses" />
  </figure>
</template>
