<script>
import { ref, watchEffect, computed } from 'vue'

const Switch = {
  name: 'VSwitch',
  props: {
    modelValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
    },
    nativeValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
    },
    disabled: {
      type: Boolean,
      default: null
    },
    type: String,
    passiveType: String,
    name: String,
    required: Boolean,
    size: String,
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
    outlined: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = ref(props.modelValue)
    const passiveClass = computed(() => props.passiveType && `${props.passiveType}-passive`)
    const rootClasses = computed(() => {
      return [
        props.size,
        {
          'is-disabled': props.disabled,
          'is-rounded': props.rounded,
          'is-outlined': props.outlined,
        }
      ]
    })
    watchEffect(() => {
      emit('update:modelValue', value.value)
    })
    return { value, passiveClass, rootClasses }
  }
}

export default Switch
</script>

<template>
  <label
    class="switch"
    :class="rootClasses"
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
      :class="[passiveClass,type]" />
    <span class="control-label"><slot /></span>
  </label>
</template>
