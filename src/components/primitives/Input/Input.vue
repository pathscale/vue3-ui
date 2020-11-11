<script>
import { ref, watchEffect } from 'vue'

export default {
  name: 'VInput',
  inheritAttrs: false,
  props: {
    color: String,
    size: String,
    rounded: Boolean,
    loading: Boolean,
    leftIcon: String,
    rightIcon: String,
    errorMsg: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const value = ref(attrs.modelValue)
    watchEffect(() => emit('update:modelValue', value.value))
    return { value, props }
  },
}
</script>

<template>
  <div
    class="control"
    :class="[
      size,
      {
        'is-loading': loading,
        'has-icons-left': leftIcon,
        'has-icons-right': rightIcon
      }
    ]">
    <p v-if="errorMsg" class="error">
      {{ errorMsg }}
    </p>
    <input class="input" v-bind="$attrs" v-model="value" :class="[
      color,
      statusType,
      size,
      {
        'is-rounded': rounded,
        'is-expanded': expanded
      }
    ]" />
    <span v-if="leftIcon" class="icon is-left">
      <i>{{ leftIcon }}</i>
    </span>
    <span v-if="rightIcon" class="icon is-right">
      <i>{{ rightIcon }}</i>
    </span>
  </div>
</template>
