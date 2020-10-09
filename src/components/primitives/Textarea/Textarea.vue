<script>
import { ref, watchEffect, computed } from 'vue'

const Textarea = {
  name: 'VTextarea',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    color: String,
    hasCounter: Boolean,
    loading: Boolean,
    maxlength: String,
    modelValue: String,
    size: String,
    hovered: Boolean,
    focused: Boolean,
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue)
    const isFocused = ref(false)
    const onFocus = () => { isFocused.value = true }
    const onBlur = () => { isFocused.value = false }
    const valueLength = computed(() => value.value.length)
    const showCounter = computed(() => props.maxlength && props.hasCounter)
    const rootClasses = computed(() => {
      return [
        props.size,
        {
          'is-loading': props.loading
        }
      ]
    })
    const inputClasses = computed(() => {
      return [
        props.size,
        props.color,
        {
          'is-hovered': props.hovered,
          'is-focused': props.focused,
        }]
    })

    watchEffect(() => emit('update:modelValue', value.value))
    return { value, isFocused, onBlur, onFocus, valueLength, rootClasses, inputClasses, showCounter }
  },
}

export default Textarea
</script>

<template>
  <div
    class="control"
    :class="rootClasses">
    <textarea
      ref="textarea"
      class="textarea"
      v-model="value"
      :class="inputClasses"
      :maxlength="maxlength"
      v-bind="$attrs"
      @blur="onBlur"
      @focus="onFocus" />
    <small
      v-if="showCounter"
      :class="{ 'is-invisible': !isFocused }">
      {{ valueLength }} / {{ maxlength }}
    </small>
  </div>
</template>
