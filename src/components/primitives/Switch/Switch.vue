<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
    modelValue?: any;
    // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
    nativeValue?: any;
    disabled?: boolean;
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
      | "is-danger";
    passiveType?:
      | "is-white"
      | "is-black"
      | "is-light"
      | "is-dark"
      | "is-primary"
      | "is-info"
      | "is-success"
      | "is-warning"
      | "is-danger"
      | string; // and any other colors you've set in the $colors list on Sass
    name?: string;
    required?: boolean;
    size?: "is-small" | "is-medium" | "is-large";
    // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
    trueValue?: any;
    // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
    falseValue?: any;
    rounded?: boolean;
    outlined?: boolean;
  }>(),
  {
    trueValue: true,
    falseValue: false,
    rounded: true,
  },
);

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);
const passiveClass = computed(
  () => props.passiveType && `${props.passiveType}-passive`,
);
watchEffect(() => {
  value.value = props.modelValue;
});
watchEffect(() => {
  emit("update:modelValue", value.value);
});
</script>

<template>
  <label
    class="switch"
    :class="[
      size,
      {
        'is-disabled': disabled,
        'is-rounded': rounded,
        'is-outlined': outlined,
      }
    ]"
    :disabled="disabled">
    <input
      v-model="value"
      type="checkbox"
      @click.stop
      :disabled="disabled"
      :name="name"
      :required="required"
      :value="nativeValue"
      :true-value="trueValue"
      :false-value="falseValue" />
    <span
      class="check"
      :class="[passiveClass, type]" />
    <span class="control-label"><slot /></span>
  </label>
</template>
