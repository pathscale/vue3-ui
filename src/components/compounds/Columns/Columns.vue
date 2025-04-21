<script setup lang="ts">
defineProps<{
  mobile: boolean;
  desktop: boolean;
  gapless: boolean;
  gap: string;
  multiline: boolean;
  hcentered: boolean;
  vcentered: boolean;
}>();
</script>

<template>
  <div class="columns" :class="[
    gap,
    {
      'is-mobile': mobile,
      'is-desktop': desktop,
      'is-gapless': gapless,
      'is-variable': gap,
      'is-vcentered': vcentered,
      'is-multiline': multiline,
      'is-centered': hcentered,
    }
  ]">
    <slot />
  </div>
</template>
