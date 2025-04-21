<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string;
  }>(),
  {
    tag: "footer",
  },
);
</script>

<template>
  <component
    :is="tag"
    class="card-footer">
    <slot />
  </component>
</template>
