<script>
export default {
  name: 'VSvg',
  inheritAttrs: false,
  props: {
    bundle: String,
    name: String,
  },
}
</script>

<template>
  <svg :class="`svg-${name}`">
    <use :href="`/${bundle}.svg#${name}`" />
  </svg>
</template>
