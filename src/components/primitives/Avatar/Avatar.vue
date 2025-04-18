<script setup lang="ts">
import { checkBenchieSupport } from "@/utils/functions";
import { onBeforeMount, ref } from "vue";

const hasBenchieSupport = checkBenchieSupport();

const props = withDefaults(
  defineProps<{
    alt?: string;
    size?: string;
    rounded?: boolean;
    background?: string;
    text?: string;
    src?: string;
    dataSrc?: string;
    customClass?: string;
  }>(),
  {
    size: "is-64x64",
    rounded: true,
    background: "has-background-link",
    text: "has-text-white",
  },
);

const source = ref(props.src || props.dataSrc);
const background = ref(props.background);
const text = ref(props.text);
const alt = ref(props.alt);

onBeforeMount(async () => {
  if (props.dataSrc && hasBenchieSupport) {
    source.value = await t(props.dataSrc, $__CDN);
  }
});

const backgroundColor = source.value ? "" : background.value;

const textColor = source.value ? "" : text.value;

const caption = alt.value
  ? alt.value.split(" ")[0][0] + alt.value.split(" ")[1][0]
  : "";
</script>

<template>
  <figure
    class="image is-flex is-justify-content-center is-align-items-center mx-1"
    :class="[size, backgroundColor, textColor]">
    <img
      :src="source"
      :data-src="dataSrc"
      :alt="alt"
      v-if="source"
      :class="[customClass, { 'is-rounded': rounded }]" />
    <span class="is-size-4" v-if="!source" :class="[{ 'is-rounded': rounded }]">
      {{ caption }}
    </span>
  </figure>
</template>
