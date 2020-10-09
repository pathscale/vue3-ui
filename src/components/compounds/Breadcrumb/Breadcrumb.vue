<script>
const Component = {
  name: 'VBreadcrumb',
  props: {
    alignment: String,
    separator: String,
    size: String,
  }
}

export default Component
</script>

<template>
  <nav class="breadcrumb" :class="[alignment, separator, size]" aria-label="breadcrumbs">
    <ul>
      <slot />
    </ul>
  </nav>
</template>
