<script>
/* eslint no-shadow: ["error", { "allow": ["event"] }] -- prevent warning  'event' is already declared in the upper scope */
const Tag = {
  name: "VTag",
  props: {
    attached: Boolean,
    closable: Boolean,
    type: String,
    size: String,
    rounded: Boolean,
    disabled: {
      type: Boolean,
      default: null
    },
    ellipsis: Boolean,
    tabstop: {
      type: Boolean,
      default: true
    },
    ariaCloseLabel: String,
    closeType: String,
    closeIcon: String,
  },
  setup(props, { emit }) {
    const close = function (event) {
      if (props.disabled) return
      emit('close', event)
    }
    return { close }
  }
};

export default Tag;
</script>

<template>
  <div v-if="attached && closable" class="tags has-addons">
    <span
      class="tag"
      :class="[type, size, { 'is-rounded': rounded }]">
      <span :class="{ 'has-ellipsis': ellipsis }">
        <slot />
      </span>
    </span>
    <a
      class="tag"
      role="button"
      :aria-label="ariaCloseLabel"
      :tabindex="tabstop ? 0 : false"
      :disabled="disabled"
      :class="[size,
               closeType,
               {'is-rounded': rounded},
               closeIcon ? 'has-delete-icon' : 'is-delete']"
      @click="close"
      @keyup.delete.prevent="close" />
  </div>
  <span
    v-else
    class="tag"
    :class="[type, size, { 'is-rounded': rounded }]">
    <span :class="{ 'has-ellipsis': ellipsis }">
      <slot />
    </span>

    <a
      v-if="closable"
      role="button"
      :aria-label="ariaCloseLabel"
      class="delete is-small"
      :class="closeType"
      :disabled="disabled"
      :tabindex="tabstop ? 0 : false"
      @click="close"
      @keyup.delete.prevent="close" />
  </span>
</template>
