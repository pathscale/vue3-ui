<script setup lang="ts">
import type { CheckRadioProps } from "@/mixins/CheckRadioProps";
import { ref, watchEffect } from "vue";

interface IProps extends CheckRadioProps {
  indeterminate?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
  trueValue?: any;
  // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
  falseValue?: any;
}

const props = withDefaults(defineProps<IProps>(), {
  trueValue: true,
  falseValue: false,
});

const emit = defineEmits(["update:modelValue"]);

const label = ref(null);
const input = ref(null);
const value = ref(props.modelValue);

const focus = () => {
  input.value.focus();
};

watchEffect(() => {
  emit("update:modelValue", value.value);
});

watchEffect(() => {
  value.value = props.modelValue;
});
</script>

<template>
  <label
    class="v-checkbox checkbox"
    :class="[ size, { 'is-disabled': disabled }]"
    ref="label"
    :disabled="disabled"
    @click="focus"
    @keydown.prevent.enter="label.click()">
    <input
      v-model="value"
      :indeterminate.prop="indeterminate"
      type="checkbox"
      ref="input"
      @click.stop
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="nativeValue"
      :true-value="trueValue"
      :false-value="falseValue" />
    <span class="check" :class="type" />
    <span class="control-label"><slot /></span>
  </label>
</template>
