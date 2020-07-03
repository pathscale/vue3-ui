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
  }
}

export default Button;
</script>

<template>
  <img
    class="image"
    v-bind="$attrs"
    :class="[size, radio, {
      'is-rounded': rounded
    }]" />
</template>
