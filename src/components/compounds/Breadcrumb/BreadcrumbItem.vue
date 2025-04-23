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
  <li class="li" :class="{
    'is-active': active
  }">
    <component
      :is="tag"
      v-bind="$attrs">
      <slot />
    </component>
  </li>
</template>
