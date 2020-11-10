<script>
/* eslint-disable no-undef -- Access to Benchie variable/function */
import { computed, onBeforeMount, ref } from 'vue'

export default {
  name: 'VImage',
  inheritAttrs: false,
  props: {
    size: String,
    radio: String,
    rounded: Boolean,
    centered: Boolean,
    src: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const source = ref(props.src)
    onBeforeMount(async() => {
      const hasBenchieSupport = t && typeof t === 'function' && $__CDN && typeof $__CDN === 'string'
      if (hasBenchieSupport) {
        source.value = await t(props.src, $__CDN)
      }
    })

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
    return { figureClasses, imgClasses, source }
  }
}
</script>

<template>
  <figure class="image" :class="figureClasses">
    <img v-bind="$attrs" :src="source" :class="imgClasses" />
  </figure>
</template>
