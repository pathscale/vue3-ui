<script setup lang="ts">
import { checkBenchieSupport } from "@/utils/functions";
import { defineProps, onBeforeMount, ref } from "vue";

const hasBenchieSupport = checkBenchieSupport();

const props = defineProps<{
  size?: string;
  radio?: string;
  rounded?: boolean;
  centered?: boolean;
  src?: string;
  dataSrc?: string;
  customClass?: string;
}>();

const source = ref(props.src || props.dataSrc);

onBeforeMount(async () => {
  if (props.dataSrc && hasBenchieSupport) {
    source.value = await t(props.dataSrc, $__CDN);
  }
});
</script>

<template>
  <figure
    class="image figure"
    :class="[
      size,
      radio,
      {
        'container': centered,
      },
    ]">
    <img
      class="img"
      v-bind="$attrs"
      :src="source"
      :data-src="dataSrc"
      :class="[customClass, { 'is-rounded': rounded }]" />
  </figure>
</template>
