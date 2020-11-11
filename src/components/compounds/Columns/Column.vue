<script>
export default {
  name: 'VColumn',
  props: {
    size: String,
    offset: String,
    narrow: Boolean,
    narrowBreakpoint: String
  },
}
</script>

<template>
  <div class="column" :class="[
    props.size,
    props.offset,
    props.narrowBreakpoint,
    {
      'is-narrow': props.narrow
    }
  ]">
    <slot />
  </div>
</template>
