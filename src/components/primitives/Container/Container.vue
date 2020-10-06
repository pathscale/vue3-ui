<script>

const Component = {
  name: 'VContainer',
  props: {
    type: String,
    bg: Object,

  }
}
export default Component
</script>

<template>
  <div
    class="container"
    :class="[type]"
    :style="[ bg ? {
      'background-image': `url(${bg})`,
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
    } : {}]">
    <slot />
  </div>
</template>
