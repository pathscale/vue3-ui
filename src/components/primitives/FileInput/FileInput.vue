<script>
const FileInput = {
  name: "VFile",
  inheritAttrs: false,
  props: {
    hasName: {
      type: Boolean,
      default: false
    },
    fullwidth: {
      type: Boolean,
      default: false
    },
    boxed: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: "is-primary"
    },
    alignment: {
      type: String,
      default: null
    }
  },
}
export default FileInput
</script>

<template>
  <div 
    class="file"
    :class="[size, color, alignment, {
      'has-name': hasName,
      'is-fullwidth': fullwidth,
      'is-boxed': boxed
    }]">
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