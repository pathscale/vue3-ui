<script>
/* eslint no-shadow: ["error", { "allow": ["focus"] }] -- prevent warning  'focus' is already declared in the upper scope */
import { ref, watchEffect } from 'vue'
import CheckRadioMixin from '../../../mixins/CheckRadio.js'

const Checkbox = {
    name: 'VCheckbox',
    props: {
        ...CheckRadioMixin.props,
        indeterminate: {
            type: Boolean,
            default: false,
        },
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: false
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        // references
        const label = ref(null);
        const input = ref(null);
        // state
        const value = ref(props.modelValue);
        // MacOS FireFox and Safari do not focus when clicked
        const focus = () => {
            input.value.focus()
        };
        // watch for changes in value
        watchEffect(() => {
            emit('update:modelValue', value.value)
        })
        return { label, input, value, focus }
    }
}

export default Checkbox;
</script>

<template>
  <label
    class="b-checkbox checkbox"
    :class="[size, { 'is-disabled': disabled }]"
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
