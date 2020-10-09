<script>
import { computed } from 'vue'

const ImageComponent = {
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

export default ImageComponent
</script>

<template>
  <figure class="image" :class="figureClasses">
    <img v-bind="$attrs" :class="imgClasses" />
  </figure>
</template>
