<script setup lang="ts">
defineProps<{
  size?: string;
  offset?: string;
  narrow?: boolean;
  narrowBreakpoint?: string;
}>();
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
