<script>
import { ref, watchEffect, computed } from 'vue'

export default {
  name: 'VSelect',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    placeholder: String,
    multiple: Boolean,
    nativeSize: {
      type: [String, Number],
      default: null
    },
    size: String,
    expanded: Boolean,
    loading: Boolean,
    rounded: Boolean,
    color: String,
  },
  emits: ['update:modelValue', 'blur', 'focus'],
  setup(props, { emit }) {
    const value = ref(props.modelValue)
    const valueIsNullish = computed(() => value.value === null)
    const empty = computed(() => props.selected === null)
    watchEffect(() => {
      emit('update:modelValue', value.value)
    })
    watchEffect(() => {
      value.value = props.modelValue
    })
    return { value, valueIsNullish, empty }
  },
}
</script>

<template>
  <div
    class="control"
    :class="{ 'is-expanded': expanded }">
    <span class="select" :class="[size, color, {
      'is-fullwidth': expanded,
      'is-loading': loading,
      'is-multiple': multiple,
      'is-rounded': rounded,
      'is-empty': empty
    }]">
      <select
        v-model="value"
        ref="select"
        :multiple="multiple"
        :size="nativeSize"
        v-bind="$attrs"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)">
        <template v-if="placeholder">
          <option
            class="has-background-dark has-text-light"
            v-if="valueIsNullish"
            :value="null"
            disabled
            hidden>
            {{ placeholder }}
          </option>
        </template>
        <slot />
      </select>
    </span>
  </div>
</template>
