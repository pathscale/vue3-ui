<script setup lang="ts">
// todo add docs to https://vue3.dev/documentation
import { computed } from "vue";

const props = defineProps<{
  type?: string;
  bg?: string;
}>();

const rootStyle = computed(() => {
  return [
    props.bg
      ? {
          "background-image": `url(${props.bg})`,
          "background-size": "cover",
          "background-repeat": "no-repeat",
        }
      : {},
  ];
});
</script>

<template>
  <div
    class="container"
    :class="[type]"
    :style="rootStyle">
    <slot />
  </div>
</template>
