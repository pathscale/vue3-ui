<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    size?: "is-small" | "is-normal" | "is-medium" | "is-large";
    bundle: string; // required
    name: string; // required
    customClass?: string;
    customSize?: string;
    fill?: string;
    cacheVersion?: string;
  }>(),
  {
    cacheVersion: "1.0.0",
  },
);

const shouldIconClass = computed(() => !props.customSize && !props.customClass);
// Only apply 100% size when bulma icon class is used
const computedHeight = computed(() =>
  !shouldIconClass.value ? props.customSize : "100%",
);
const computedWidth = computed(() =>
  !shouldIconClass.value ? props.customSize : "100%",
);
</script>

<template>
  <span :class="[{ 'icon': shouldIconClass }, size]">
    <svg :fill="fill" :height="computedHeight" :width="computedWidth" :class="[customClass]">
      <use :href="`/${bundle}.svg?v=${cacheVersion}#${name}`" />
    </svg>
  </span>
</template>
