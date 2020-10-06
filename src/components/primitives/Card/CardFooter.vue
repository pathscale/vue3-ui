<script>
const Component ={
  name: 'VCardFooter',
  props: {
    tag: {
      type: String,
      default: 'footer'
    }
  }
}

export default Component;
</script>

<template>
  <component
    :is="tag"
    class="card-footer">
    <slot />
  </component>
</template>
