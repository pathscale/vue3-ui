<script setup lang="ts">
import type { CheckRadioProps } from "@/types/CheckRadioProps";
import { useTemplateRef } from "vue";

interface IProps extends CheckRadioProps {
  indeterminate?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
  trueValue?: any;
  // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
  falseValue?: any;
}

const props = withDefaults(defineProps<IProps>(), {
  trueValue: true,
  falseValue: false, // todo update doc: set false instead N/A
});

const emit = defineEmits(["update:modelValue"]);

const label = useTemplateRef<HTMLLabelElement>("label");
const input = useTemplateRef<HTMLInputElement>("input");
const value = defineModel();

const focus = () => {
  input.value?.focus();
};
</script>

<template>
  <label
    class="v-checkbox checkbox"
    :class="[ size, { 'is-disabled': disabled }]"
    ref="label"
    :disabled="disabled"
    @click="focus"
    @keydown.prevent.enter="label?.click()">
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
