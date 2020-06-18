<script>
import { computed } from 'vue'

const Button ={
  name: 'VButton',
  props: {
      type: {
          type: String,
          default: 'button'
      },
      size: {
          type: String,
          default: null
      },
      label: {
          type: String,
          default: null,
      },
      rounded: {
          type: Boolean,
          default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      outlined: {
        type: Boolean,
        default: false,
      },
      expanded: {
        type: Boolean,
        default: false,
      },
      inverted: {
        type: Boolean,
        default: false,
      },
      focused: {
        type: Boolean,
        default: false,
      },
      active: {
        type: Boolean,
        default: false,
      },
      hovered: {
        type: Boolean,
        default: false,
      },
      selected: {
        type: Boolean,
        default: false,
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      tag: {
        type: String,
        default: 'button'
      }
  },
  setup(props, { attrs }) {
    const computedTag = computed(() => attrs.disabled ? 'button' : props.tag)
    return { computedTag }
  }
}

export default Button;
</script>

<template>
  <component
    :is="computedTag"
    class="button"
    :type="nativeType"
    v-bind="$attrs"
    :class="[size, type, {
      'is-rounded': rounded,
      'is-loading': loading,
      'is-outlined': outlined,
      'is-fullwidth': expanded,
      'is-inverted': inverted,
      'is-focused': focused,
      'is-active': active,
      'is-hovered': hovered,
      'is-selected': selected
    }]">
    <span v-if="label">{{ label }}</span>
    <slot />
  </component>
</template>
