<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    tag?: string;
    active?: boolean;
  }>(),
  {
    tag: "a",
  },
);
</script>

<template>
  <component
    :is="tag"
    class="navbar-item"
    :class="{
      'is-active': active
    }"
    v-bind="$attrs">
    <slot />
  </component>
</template>
