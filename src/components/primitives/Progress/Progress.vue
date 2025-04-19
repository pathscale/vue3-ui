<script setup lang="ts">
import { formatToFixed } from "@/utils/functions";
import { computed, nextTick, useTemplateRef, watchEffect } from "vue";

type ClassValue = string | string[] | Record<string, boolean>;

const props = withDefaults(
  defineProps<{
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
      | "is-danger"
      | "is-darkgrey";
    size?: "is-small" | "is-medium" | "is-large";
    value?: number | null | undefined;
    max?: number;
    showValue?: boolean;
    format?: "raw" | "percent";
    precision?: number;
    keepTrailingZeroes?: boolean;
  }>(),
  {
    type: "is-darkgrey",
    max: 100,
    format: "raw",
    precision: 2,
  },
);

const progress = useTemplateRef("progress");

watchEffect(() =>
  nextTick(() => {
    if (isIndeterminate.value) {
      progress.value.removeAttribute("value");
    } else {
      progress.value.setAttribute("value", props.value);
    }
  }),
);

const isIndeterminate = computed(() => {
  return props.value === undefined || props.value === null;
});

const beyondHalf = computed(() => props.value >= 50);

const newValue = computed(() => {
  if (
    props.value === undefined ||
    props.value === null ||
    Number.isNaN(props.value)
  ) {
    return undefined;
  }

  // 'percent' format
  if (props.format === "percent") {
    const val = formatToFixed(
      (props.value * 100) / props.max,
      props.precision,
      props.keepTrailingZeroes,
    );
    return `${val}%`;
  }

  // 'raw' format
  return formatToFixed(props.value, props.precision, props.keepTrailingZeroes);
});
</script>

<template>
  <div class="progress-wrapper">
    <progress
      ref="progress"
      class="progress"
      :class="[size, type]"
      :max="max"
      :value="value">
      {{ newValue }}
    </progress>
    <p
      v-if="showValue"
      class="progress-value"
      :class="{ 'more-than-half': beyondHalf }">
      <slot>{{ newValue }}</slot>
    </p>
  </div>
</template>
