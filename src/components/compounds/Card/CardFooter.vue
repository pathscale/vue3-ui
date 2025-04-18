<script>
export default {
  name: "VCardFooter",
  props: {
    tag: {
      type: String,
      default: "footer",
    },
  },
};
</script>

<template>
  <component
    :is="tag"
    class="card-footer">
    <slot />
  </component>
</template>
