<script setup lang="ts">
/*
 TODO: Update docs at https://vue3.dev/documentation/icons
   - Remove the unused `src` property from the documentation
   - Use a separate component (e.g., <v-icons>) for registering the icon sprite,
     since the current approach—using <v-icon> both for sprite declaration and individual usage—
     can be confusing
 */

import { computed } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    name: string; // required
    bundle: string; // required
    size?: "is-small" | "is-normal" | "is-medium" | "is-large";
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
