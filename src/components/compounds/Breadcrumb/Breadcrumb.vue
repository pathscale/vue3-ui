<script>

const Component = {
  name: 'VBreadcrumb',
  props: {
    alignment: {
      type: String,
      default: null
    },
    separator: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
  }
}

export default Component;
</script>

<template>
  <nav class="breadcrumb" :class="[alignment, separator, size]" aria-label="breadcrumbs">
    <ul>
      <slot />
    </ul>
  </nav>
</template>
