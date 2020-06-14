<template>
  <div class="control">
    <input
      :name="name"
      :type="type"
      v-model="value"
      class="input" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
    name: 'Input',
    props: {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
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
