<script>
export default {
  name: "VColumn",
  props: {
    size: String,
    offset: String,
    narrow: Boolean,
    narrowBreakpoint: String,
  },
};
</script>

<template>
  <div class="column" :class="[
    size,
    offset,
    narrowBreakpoint,
    {
      'is-narrow': narrow
    }
  ]">
    <slot />
  </div>
</template>
