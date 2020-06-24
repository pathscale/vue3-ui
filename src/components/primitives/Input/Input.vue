<script>
import { ref, watchEffect } from 'vue'

const Input = {
    name: 'VInput',
    inheritAttrs: false,
    emits: ['update:modelValue'],
    props: {
        customClass: {
            type: String,
            default: ''
        },
        size: String,
        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
    },
    setup(props, { emit, attrs }) {
        const value = ref(attrs.modelValue)
        watchEffect(() => emit('update:modelValue', value.value))

        const rootClasses = () => {
            return [
                props.size,
                {
                    'is-expanded': props.expanded,
                    'is-loading': props.loading,
                }
            ]
        };

        const inputClasses = () => {
            return [
                props.statusType,
                props.size,
                { 'is-rounded': props.rounded }
            ]
        }
        return { value, rootClasses, inputClasses }
    },
}

export default Input;
</script>

<template>
  <div
    class="control"
    :class="rootClasses">
    <input class="input" v-bind="$attrs" v-model="value" :class="[inputClasses, customClass]" />
  </div>
</template>
