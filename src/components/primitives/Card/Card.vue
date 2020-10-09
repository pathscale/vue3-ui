<script>
const Component = {
  name: 'VCard',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
}

export default Component
</script>

<template>
  <component
    :is="tag"
    class="card">
    <slot />
  </component>
</template>
