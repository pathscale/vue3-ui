<script>
/* eslint-disable no-undef -- Access to Benchie variable/function */
import { onBeforeMount, ref } from 'vue'

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

    return { figureClasses, imgClasses, source }
  }
}
</script>

<template>
  <figure class="image" :class="[
    size,
    radio,
    {
      'container': centered
    }
  ]">
    <img v-bind="$attrs" :src="source" :class="{
      'is-rounded': rounded
    }" />
  </figure>
</template>
