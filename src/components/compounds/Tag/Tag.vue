<script>
import { computed } from "vue"
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
    const addonClasses = computed(() => {
      return [
        props.type,
        props.size,
        { 
          'is-rounded': props.rounded 
        }
      ]
    })

    const ellipsisClasses = computed(() => {
      return {
        'has-ellipsis': props.ellipsis
      }
    })

    const buttonClasses = computed(() => {
      return [
        props.size,
        props.closeType,
        {
          'is-rounded': props.rounded
        },
        props.closeIcon ? 'has-delete-icon' : 'is-delete'
      ]
    })

    const tabIndex = computed(() => {
      return props.tabstop ? 0 : false
    })

    const isClosable = computed(() => {
      return props.attached && props.closable
    })

    return { close, addonClasses, ellipsisClasses, buttonClasses, tabIndex, isClosable }
  }
};

export default Tag;
</script>

<template>
  <div v-if="isClosable" class="tags has-addons">
    <span
      class="tag"
      :class="addonClasses">
      <span :class="ellipsisClasses">
        <slot />
      </span>
    </span>
    <a
      class="tag"
      role="button"
      :aria-label="ariaCloseLabel"
      :tabindex="tabIndex"
      :disabled="disabled"
      :class="buttonClasses"
      @click="close"
      @keyup.delete.prevent="close" />
  </div>
  <span
    v-else
    class="tag"
    :class="addonClasses">
    <span :class="ellipsisClasses">
      <slot />
    </span>

    <a
      v-if="closable"
      role="button"
      :aria-label="ariaCloseLabel"
      class="delete is-small"
      :class="closeType"
      :disabled="disabled"
      :tabindex="tabIndex"
      @click="close"
      @keyup.delete.prevent="close" />
  </span>
</template>
