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
    },
    cacheVersion: {
      type: String,
      default: '1.0.0',
    },
  },
  setup(props) {
    const shouldIconClass = computed(() => !props.customSize && !props.customClass)
    // Only apply 100% size when bulma icon class is used
    const computedHeight = computed(() => (!shouldIconClass.value ? props.customSize : '100%'))
    const computedWidth = computed(() => (!shouldIconClass.value ? props.customSize : '100%'))
    return { computedHeight, computedWidth, shouldIconClass }
  },
}
</script>

<template>
  <span :class="[{ 'icon': shouldIconClass }, size]">
    <svg :fill="fill" :height="computedHeight" :width="computedWidth" :class="[customClass]">
      <use :href="`/${bundle}.svg?v=${cacheVersion}#${name}`" />
    </svg>
  </span>
</template>
