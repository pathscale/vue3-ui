<script>
import { computed } from 'vue'
/* eslint no-shadow: ["error", { "allow": ["event"] }] -- prevent warning  'event' is already declared in the upper scope */

export default {
  name: 'VTag',
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
  emits: ['close'],
  setup(props, { emit }) {
    const close = function(event) {
      if (props.disabled) return
      emit('close', event)
    }

    const tabIndex = computed(() => props.tabstop ? 0 : false )

    const isClosable = computed(() => props.attached && props.closable )

    const closeButtonInside = computed(() => props.closable && !(props.attached && props.closable))

    return { close, tabIndex, isClosable, closeButtonInside }
  }
}
</script>

<template>
  <div :class="{'tags has-addons': isClosable}">
    <span
      class="tag"
      :class="[type, size, { 'is-rounded': rounded }]">
      <span :class="{'has-ellipsis': props.ellipsis}">
        <slot />
      </span>
      <a
        v-if="closeButtonInside"
        role="button"
        :aria-label="ariaCloseLabel"
        class="delete is-small"
        :class="closeType"
        :disabled="disabled"
        :tabindex="tabIndex"
        @click="close"
        @keyup.delete.prevent="close" />
    </span>
    <a
      v-if="isClosable"
      class="tag"
      role="button"
      :aria-label="ariaCloseLabel"
      :tabindex="tabIndex"
      :disabled="disabled"
      :class="[size, closeType, {'is-rounded': rounded, 'has-delete-icon': closeIcon, 'is-delete': !closeIcon}]"
      @click="close"
      @keyup.delete.prevent="close" />
  </div>
</template>
