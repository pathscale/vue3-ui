<script setup lang="ts">
// todo add docs to https://vue3.dev/documentation
import { checkBenchieSupport } from "@/utils/functions";
import { computed, onBeforeMount, ref } from "vue";

const hasBenchieSupport = checkBenchieSupport();

const props = defineProps<{
  type?: string;
  bg?: string;
}>();

const bgImageUrl = ref(props.bg);

onBeforeMount(async () => {
  if (props.bg && hasBenchieSupport) {
    bgImageUrl.value = await t(props.bg, $__CDN);
  }
});

const rootStyle = computed(() => {
  return [
    props.bg
      ? {
          "background-image": `url(${bgImageUrl.value})`,
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
