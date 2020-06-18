<template>
  <div class="mt-4">
    <label :for="name" v-if="label" class="text-white">{{ label }}</label>
    <textarea
      :name="name"
      v-model="value"
      v-bind="$attrs"
      rows="4"
      cols="50"
      class="transition ease-in-out duration-300 bg-transparent block w-full px-2 py-4 border-b-2 focus:outline-none focus:z-10 border-wine focus:border-wine-lighter placeholder-gray-400 relative sm:leading-5 sm:text-sm text-white mb-1" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
    name: 'TextArea',
    props: {
        label: {
            type: String,
            required: false,
            default: null,
        },
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const value = ref(props.modelValue)
        watchEffect(() => {
            emit('update:modelValue', value.value)
        })
        return { value }
    },
})
</script>
