<script setup lang="ts">
defineProps<{
  label?: string;
  ariaRole?: string;
}>();
</script>

<template>
  <p v-if="label" class="menu-label">
    {{ label }}
  </p>
  <ul class="ul menu-list" :role="ariaRole">
    <slot />
  </ul>
</template>
