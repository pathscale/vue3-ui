<script>
import { ref, watchEffect, computed } from 'vue'

const Input = {
  name: 'VInput',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    color: String,
    size: String,
    rounded: Boolean,
    loading: Boolean,
    leftIcon: String,
    rightIcon: String,
    errorMsg: String
  },
  setup(props, { emit, attrs }) {
    const value = ref(attrs.modelValue)
    watchEffect(() => emit('update:modelValue', value.value))

    const rootClasses = computed(() => {
      return [
        props.size,
        {
          'is-loading': props.loading,
          'has-icons-left': props.leftIcon,
          'has-icons-right': props.rightIcon
        }
      ]
    });

    const inputClasses = computed(() => {
      return [
        props.color,
        props.statusType,
        props.size,
        {
          'is-rounded': props.rounded,
          'is-expanded': props.expanded
        }
      ]
    })

    return { value, rootClasses, inputClasses, props }
  },
}
export default Input;
</script>

<template>
  <div
    class="control"
    :class="rootClasses">
    <p v-if="errorMsg" class="error">
      {{ props.errorMsg }}
    </p>
    <input class="input" v-bind="$attrs" v-model="value" :class="inputClasses" />
    <span v-if="leftIcon" class="icon is-left">
      <i>{{ leftIcon }}</i>
    </span>
    <span v-if="rightIcon" class="icon is-right">
      <i>{{ rightIcon }}</i>
    </span>
  </div>
</template>
