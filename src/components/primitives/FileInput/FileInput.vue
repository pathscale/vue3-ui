<script>
export default {
  name: "VFile",
  inheritAttrs: false,
  props: {
    hasName: Boolean,
    fullwidth: Boolean,
    boxed: Boolean,
    size: String,
    color: {
      type: String,
      default: "is-primary",
    },
    alignment: String,
  },
};
</script>

<template>
  <div
    class="file"
    :class="[
      size,
      color,
      alignment,
      {
        'has-name': hasName,
        'is-fullwidth': fullwidth,
        'is-boxed': boxed
      }
    ]">
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
