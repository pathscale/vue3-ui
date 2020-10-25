<script>
export default {
  name: 'VIcon',
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
