<script>
export default {
  name: 'VIcon',
  inheritAttrs: false,
  props: {
    size: String,
    bundle: String,
    name: String,
    customClass: String
  },
}
</script>

<template>
  <span class="icon" :class="size">
    <svg :class="[customClass, `svg-${name}`]">
      <use :href="`/${bundle}.svg#${name}`" />
    </svg>
  </span>
</template>
