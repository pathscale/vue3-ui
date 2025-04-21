<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    tag?: string;
  }>(),
  {
    tag: "header",
  },
);
</script>

<template>
  <component
    :is="tag"
    class="card-header">
    <p v-if="title" class="card-header-title">
      {{ title }}
    </p>
    <slot />
  </component>
</template>
