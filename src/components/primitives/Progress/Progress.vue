<script setup lang="ts">
import { computed, nextTick, useTemplateRef, watchEffect } from "vue";

type ClassValue = string | string[] | Record<string, boolean>;

const props = withDefaults(
  defineProps<{
    type?: ClassValue;
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

/**
 * Formats a number with a specified decimal precision.
 *
 * Internally shifts the decimal point to perform rounding with correct precision,
 * then optionally removes trailing zeroes if `props.keepTrailingZeroes` is `false`.
 *
 * @param {number|string} num - The input number to format. Can be a number or a numeric string.
 * @returns {string} The formatted number as a string.
 *
 * @example
 * // props = { precision: 2, keepTrailingZeroes: true }
 * toFixed(1.2345) // "1.23"
 *
 * // props = { precision: 2, keepTrailingZeroes: false }
 * toFixed(1.2000) // "1.2"
 * toFixed(1.0000) // "1"
 */
const toFixed = (num: number | string): string => {
  let fixed = Number(
    `${Math.round(Number(`${num}e${props.precision}`))}e${-props.precision}`,
  ).toFixed(props.precision);
  if (!props.keepTrailingZeroes) {
    fixed = fixed.replace(/\.?0+$/, "");
  }
  return fixed;
};

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
    const val = toFixed((props.value * 100) / props.max);
    return `${val}%`;
  }

  // 'raw' format
  return toFixed(props.value);
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
