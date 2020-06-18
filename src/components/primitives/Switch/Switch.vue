<script>
import { ref, watchEffect } from 'vue';

const Switch = {
    name: 'VSwitch',
    props: {
        modelValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: null,
        },
        nativeValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: null,
        },
        disabled: {
            type: Boolean,
            default: null,
        },
        type: {
            type: String,
            default: null,
        },
        passiveType: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            default: null,
        },
        required: {
            type: Boolean,
            default: null,
        },
        size: {
            type: String,
            default: null,
        },
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: false
        },
        rounded: {
            type: Boolean,
            default: true
        },
        outlined: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const value = ref(props.modelValue)

        watchEffect(() => {
            emit('update:modelValue', value.value)
        })
        return { value }
    }
};

export default Switch;
</script>

<template>
  <label
    class="switch"
    :class="[size, {
      'is-disabled': disabled,
      'is-rounded': rounded,
      'is-outlined': outlined,
    }]"
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
      :class="[(passiveType &&`${passiveType}-passive`),type]" />
    <span class="control-label"><slot /></span>
  </label>
</template>
