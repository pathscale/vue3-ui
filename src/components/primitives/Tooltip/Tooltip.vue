<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    active?: boolean;
    type?:
      | "is-white"
      | "is-light"
      | "is-dark"
      | "is-black"
      | "is-text"
      | "is-primary"
      | "is-link"
      | "is-info"
      | "is-success"
      | "is-warning"
      | "is-danger";
    label: string; // required
    position?: "is-top" | "is-bottom" | "is-left" | "is-right";
    always?: boolean;
    animated?: boolean;
    square?: boolean;
    dashed?: boolean;
    multilined?: boolean;
    size?: "is-small" | "is-medium" | "is-large";
    delay?: number;
  }>(),
  {
    active: true,
    type: "is-primary",
    position: "is-top",
    size: "is-medium",
    delay: 0,
  },
);

const rootStyles = computed(() => {
  return {
    "transition-delay": `${props.delay}ms`,
  };
});
</script>

<template>
  <span
    :data-label="label"
    :class="[
      type,
      position,
      size,
      {
        'v-tooltip': active,
        'is-square': square,
        'is-animated': animated,
        'is-always': always,
        'is-multiline': multilined,
        'is-dashed': dashed
      }
    ]"
    :style="rootStyles">
    <slot />
  </span>
</template>
