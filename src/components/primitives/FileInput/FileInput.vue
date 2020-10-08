<script>
import { computed } from 'vue'

const FileInput = {
  name: "VFile",
  inheritAttrs: false,
  props: {
    hasName: Boolean,
    fullwidth: Boolean,
    boxed: Boolean,
    size: String,
    color: {
      type: String,
      default: "is-primary"
    },
    alignment: String
  },
  setup(props) {
    const rootClasses = computed(() => {
      return [
        props.size,
        props.color,
        props.alignment,
        {
          'has-name': props.hasName,
          'is-fullwidth': props.fullwidth,
          'is-boxed': props.boxed
        }
      ]
    })
    return { rootClasses }
  }
}

export default FileInput
</script>

<template>
  <div
    class="file"
    :class="rootClasses">
    <label class="file-label">
      <input class="file-input" type="file" v-bind="$attrs" />
      <span class="file-cta">
        <span class="file-label">
          <slot name="label" />
        </span>
      </span>
      <span class="file-name" v-if="hasName">
        <slot name="fileName" />
      </span>
    </label>
  </div>
</template>
