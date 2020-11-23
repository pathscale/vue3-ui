<script>
/* eslint-disable no-undef -- Access to Benchie variable/function */
import { onBeforeMount, ref } from 'vue'
import { checkBenchieSupport } from "../../../utils/functions"

const hasBenchieSupport = checkBenchieSupport()

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
    },
    dataSrc: {
      type: String,
    },
    customClass: String
  },
  setup(props) {
    const source = ref(props.src || props.dataSrc)
    onBeforeMount(async() => {
      if (props.dataSrc && hasBenchieSupport) {
        source.value = await t(props.dataSrc, $__CDN)
      }  
    })
    return { source }
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
    <img class="img" v-bind="$attrs" :src="source" :data-src="dataSrc" :class="[customClass,{'is-rounded': rounded }]" />
  </figure>
</template>
