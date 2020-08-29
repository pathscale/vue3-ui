<script>

const Button = {
  name: 'VImage',
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: null
    },
    radio: {
      type: String,
      default: null,
    },
    rounded: {
      type: Boolean,
    },
    centered: {
      type: Boolean,
    },
  }
}

export default Button;
</script>

<template>
  <figure class="image" :class="[size, radio, {
    'container': centered
  }]">
    <img v-bind="$attrs" :class="{
      'is-rounded': rounded
    }" />
  </figure>
</template>
