<script>
import { ref, watchEffect } from 'vue'

const Input = {
    name: 'Input',
    inheritAttrs: false,
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
        const value = ref(attrs.modelValue)
        watchEffect(() => emit('update:modelValue', value.value))

        return { value }
    },
}

export default Input;
</script>

<template>
  <div class="control">
    <input class="input" v-bind="$attrs" v-model="value" />
  </div>
</template>
