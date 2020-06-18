<template>
  <div class="control">
    <input class="input" v-bind="$attrs" v-model="value" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
    name: 'Input',
    inheritAttrs: false,
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
        const value = ref(attrs.modelValue)
        watchEffect(() => emit('update:modelValue', value.value))

        return { value }
    },
})
</script>
