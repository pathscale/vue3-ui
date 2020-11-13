<script>
import { ref, watchEffect, computed } from 'vue'

export default {
  name: 'VInput',
  inheritAttrs: false,
  props: {
    color: String,
    size: String,
    rounded: Boolean,
    loading: Boolean,
    expanded: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs, slots }) {
    const hasLeftIcon = computed(() => Boolean(slots.leftIcon));
    const hasRightIcon = computed(() => Boolean(slots.rightIcon));
    const value = ref(attrs.modelValue)
    watchEffect(() => emit('update:modelValue', value.value))
    return { value, hasLeftIcon, hasRightIcon }
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
        'has-icons-left': hasLeftIcon,
        'has-icons-right': hasRightIcon
      }
    ]">
    <input class="input" v-bind="$attrs" v-model="value" :class="[
      color,
      size,
      {
        'is-rounded': rounded,
        'is-expanded': expanded
      }
    ]" />
    <span class="icon is-left" v-if="hasLeftIcon">
      <slot name="leftIcon" />
    </span>
    <span class="icon is-right" v-if="hasRightIcon">
      <slot name="rightIcon" />
    </span>
  </div>
</template>
