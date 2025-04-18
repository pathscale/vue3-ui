<script>
/* eslint no-shadow: ["error", { "allow": ["focus"] }] -- prevent warning  'focus' is already declared in the upper scope */
import { ref, watchEffect } from "vue";
import CheckRadioMixin from "../../../mixins/CheckRadio.js";

export default {
	name: "VCheckbox",
	props: {
		...CheckRadioMixin.props,
		indeterminate: Boolean,
		trueValue: {
			type: [String, Number, Boolean, Function, Object, Array],
			default: true,
		},
		falseValue: {
			type: [String, Number, Boolean, Function, Object, Array],
			default: false,
		},
	},
	emits: ["update:modelValue"],
	setup(props, { emit }) {
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

		return { label, input, value, focus };
	},
};
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
