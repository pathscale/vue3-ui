<script>

const Button = {
  name: 'VImage',
  inheritAttrs: false,
  props: {
    size: String,
    radio: String,
    rounded: Boolean,
    centered: Boolean
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
