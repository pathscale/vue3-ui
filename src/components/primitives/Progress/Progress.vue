<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from "vue";

type ClassValue = string | string[] | Record<string, boolean>;

withDefaults(
  defineProps<{
    type?: ClassValue;
    size?: "is-small" | "is-medium" | "is-large";
    value?: number;
    max?: number;
    showValue?: boolean;
    format?: "raw" | "percent";
    precision?: number;
  }>(),
  {
    type: "is-darkgrey",
    max: 100,
    format: "raw",
    precision: 2,
  },
);

// export default {
//   props: {
//     keepTrailingZeroes: Boolean,
//   },
//   setup(props, { slot }) {
//     const progress = ref(null);
//
//     const toFixed = (num) => {
//       let fixed = Number(
//         `${Math.round(Number(`${num}e${props.precision}`))}e${-props.precision}`,
//       ).toFixed(props.precision);
//       if (!props.keepTrailingZeroes) {
//         fixed = fixed.replace(/\.?0+$/, "");
//       }
//       return fixed;
//     };
//
//     watchEffect(() =>
//       nextTick(() => {
//         if (isIndeterminate.value) {
//           progress.value.removeAttribute("value");
//         } else {
//           progress.value.setAttribute("value", props.value);
//         }
//       }),
//     );
//
//     const isIndeterminate = computed(() => {
//       return props.value === undefined || props.value === null;
//     });
//
//     const beyondHalf = computed(() => props.value >= 50);
//
//     const newValue = computed(() => {
//       if (
//         props.value === undefined ||
//         props.value === null ||
//         Number.isNaN(props.value)
//       ) {
//         return undefined;
//       }
//
//       if (props.format === "percent") {
//         const val = toFixed((props.value * 100) / props.max);
//         return `${val}%`;
//       }
//       const val = toFixed(props.value);
//       return val;
//     });
//
//     return { beyondHalf, newValue, progress };
//   },
// };
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
