<script>
import { watchEffect, ref, computed } from 'vue'

export default {
  name: 'VUpload',
  inheritAttrs: false,
  props: {
    modelValue: [File, Array],
    multiple: Boolean,
    disabled: Boolean,
    accept: String,
    dragDrop: Boolean,
    type: String,
    size: String,
    centered: Boolean,
    right: Boolean,
    fullWidth: Boolean,
    boxed: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const value = ref(props.modelValue)

    watchEffect(() => {
      value.value = props.modelValue
    })

    watchEffect(() => {
      emit('update:modelValue', value.value)
    })

    function onChange(e) {
      const { files } = e.target
      value.value = props.multiple ? [...files] : files[0]
    }

    function dragover(e) {
      props.dragDrop && e.preventDefault()
    }

    function drop(e) {
      if (props.dragDrop) {
        e.preventDefault()
        value.value = props.multiple ? [...e.dataTransfer.files] : e.dataTransfer.files[0]
      }
    }

    const hasName = computed(() => Boolean(slots.name))

    return {
      onChange,
      hasName,
      dragover,
      drop,
    }
  },
}
</script>

<template>
  <div
    class="file"
    :class="[
      type,
      size,
      {
        'is-centered': centered,
        'has-name': hasName,
        'is-right': right,
        'is-fullwidth': fullWidth,
        'is-boxed': boxed,
      },
    ]">
    <label class="file-label" @dragover="dragover" @dragleave="dragleave" @drop="drop">
      <input
        class="file-input"
        type="file"
        name="resume"
        v-bind="$attrs"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="onChange" />
      <span class="file-cta">
        <span class="file-icon">
          <slot name="icon" />
        </span>
        <span class="file-label"> <slot name="label" /> </span>
      </span>
      <span v-if="hasName" class="file-name">
        <slot name="name" />
      </span>
    </label>
  </div>
</template>



