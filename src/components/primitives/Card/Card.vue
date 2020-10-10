<script>
export default {
  name: 'VCard',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
}
</script>

<template>
  <component
    :is="tag"
    class="card">
    <slot />
  </component>
</template>
