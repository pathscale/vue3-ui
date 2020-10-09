<script>
const Component = {
  name: 'VMenu',
  props: {
    accordion: Boolean, // TODO
    activable: Boolean // TODO
  },
}

export default Component
</script>

<template>
  <div class="menu">
    <slot />
  </div>
</template>
