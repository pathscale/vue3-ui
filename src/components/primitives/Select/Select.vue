
<script>
import { ref, watchEffect, computed } from 'vue'

const Select = {
    name: 'VSelect',
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        placeholder: { type: String, default: null },
        multiple: Boolean,
        nativeSize: {
          type: [String, Number],
          default: null
        },
        size: { type: String, default: null },
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
        color: String,
    },
    emits: ['update:modelValue', 'blur', 'focus'],
    setup(props, { emit }) {
        const value = ref(props.modelValue)
        const spanClasses = computed(() => {
            return [props.size, props.color, {
                'is-fullwidth': props.expanded,
                'is-loading': props.loading,
                'is-multiple': props.multiple,
                'is-rounded': props.rounded,
                'is-empty': props.selected === null
            }]
        })
        watchEffect(() => { 
          emit('update:modelValue', value.value)
        })
        return { value, spanClasses }
    },
}
export default Select
</script>
<template>
  <div
    class="control"
    :class="{ 'is-expanded': expanded }">
    <span class="select" :class="spanClasses">
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
            v-if="value == null"
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