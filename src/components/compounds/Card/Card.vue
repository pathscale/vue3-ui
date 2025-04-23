<script setup lang="ts">
// TODO: Add documentation for the Card component, including examples with related components, to https://vue3.dev/documentation

withDefaults(
  defineProps<{
    tag?: string;
  }>(),
  {
    tag: "div",
  },
);
</script>

<template>
  <component
    :is="tag"
    class="card">
    <slot />
  </component>
</template>
