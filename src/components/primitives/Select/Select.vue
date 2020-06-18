<template>
  <select
    v-bind="$attrs"
    v-model="value"
    class="bg-grey bg-transparent block focus:outline-none mt-2 pr-8 px-4 py-2 rounded text-white w-32">
    <slot />
  </select>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
    name: 'Select',
    props: {
        modelValue: {
            type: String,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const value = ref(props.modelValue)
        watchEffect(() => emit('update:modelValue', value.value))
        return { value }
    },
})
</script>
