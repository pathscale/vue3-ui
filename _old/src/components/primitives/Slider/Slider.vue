<script>
import { computed, ref, watchEffect } from 'vue'

export default {
  name: 'VSlider',
  props: {
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: 100,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    type: {
      type: String,
    },
    size: String,
    tooltip: {
      type: Boolean,
    },
    rounded: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    vertical: Boolean,
    modelValue: [String, Number],
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const input = ref(null)
    const orient = computed(() => (props.vertical ? 'vertical' : 'horizontal'))
    const position = ref(0)

    const value = ref(props.modelValue)

    watchEffect(() => {
      value.value = props.modelValue
    })

    watchEffect(() => {
      emit('update:modelValue', value.value)
    })

    watchEffect(() => {
      if (input.value) {
        position.value =
          ((value.value - props.min) * input.value.clientWidth) / (props.max - props.min) - 20
      }
    })
    return { value, orient, input, position }
  },
}
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
      :orient="orient" />
    <output v-if="tooltip" for="sliderWithValueTooltip" :style="`left: ${position}px`">{{
      value
    }}</output>
  </div>
</template>
