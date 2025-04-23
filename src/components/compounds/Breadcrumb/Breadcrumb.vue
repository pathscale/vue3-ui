<script setup lang="ts">
defineProps<{
  alignment?: "is-centered" | "is-right";
  separator?:
    | "has-arrow-separator"
    | "has-bullet-separator"
    | "has-dot-separator"
    | "has-succeeds-separator";
  size?: "is-normal" | "is-medium" | "is-large";
}>();
</script>

<template>
  <nav class="breadcrumb" :class="[alignment, separator, size]" aria-label="breadcrumbs">
    <ul class="ul">
      <slot />
    </ul>
  </nav>
</template>
