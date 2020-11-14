<script>
import { computed } from 'vue'

export default {
  name: 'VIcon',
  inheritAttrs: false,
  props: {
    size: String,
    bundle: String,
    name: String,
    customClass: String,
    customSize: String,
    fill: {
      type: String,
    }
  },
  setup(props) {
    const shouldIconClass = computed(() => !props.customSize && !props.customClass)
    const computedHeight = computed(() => props.customSize ? props.customSize : "100%")
    const computedWidth = computed(() => props.customSize ? props.customSize : "100%")

    return { computedHeight, computedWidth, shouldIconClass }
  },
}
</script>

<template>
  <span :class="[{'icon': shouldIconClass}, size]">
    <svg :fill="fill" :height="computedHeight" :width="computedWidth" :class="[customClass]">
      <use :href="`/${bundle}.svg#${name}`" />
    </svg>
  </span>
</template>
