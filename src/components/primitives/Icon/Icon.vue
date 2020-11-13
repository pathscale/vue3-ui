<script>
export default {
  name: 'VIcon',
  inheritAttrs: false,
  props: {
    bundle: String,
    name: String,
    customClass: String
  },
}
</script>

<template>
  <svg :class="[customClass, `svg-${name}`]">
    <use :href="`/${bundle}.svg#${name}`" />
  </svg>
</template>
