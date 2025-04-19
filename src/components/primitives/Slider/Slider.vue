<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: number | string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    type?: "is-info" | "is-success" | "is-warning" | "is-danger";
    size?: "is-small" | "is-medium" | "is-large";
    tooltip?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    vertical?: boolean;
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
  },
);

const emit = defineEmits(["update:modelValue"]);

const input = useTemplateRef<HTMLInputElement>("input");
// Non-standard attribute
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range#orient
const orient = computed(() => (props.vertical ? "vertical" : "horizontal"));
const position = ref(0);

const value = ref(props.modelValue);

watchEffect(() => {
  value.value = props.modelValue;
});

watchEffect(() => {
  emit("update:modelValue", value.value);
});

watchEffect(() => {
  if (input.value) {
    position.value =
      ((value.value - props.min) * input.value.clientWidth) /
        (props.max - props.min) -
      20;
  }
});
</script>

<template>
  <div>
    <input
      ref="input"
      class="slider is-fullwidth"
      :class="[
        type,
        size,
        {
          'is-circle': rounded,
          'has-output-tooltip': tooltip,
        },
      ]"
      :step="step"
      :min="min"
      :max="max"
      v-model="value"
      type="range"
      :disabled="disabled"
      v-bind="{ orient }" />
    <output v-if="tooltip" for="sliderWithValueTooltip" :style="`left: ${position}px`">{{
      value
    }}</output>
  </div>
</template>
