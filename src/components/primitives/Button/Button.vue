<script>
import { computed } from 'vue'

export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    size: String,
    label: String,
    rounded: Boolean,
    loading: Boolean,
    outlined: Boolean,
    expanded: Boolean,
    inverted: Boolean,
    focused: Boolean,
    active: Boolean,
    hovered: Boolean,
    selected: Boolean,
    nativeType: {
      type: String,
      default: 'button'
    },
    tag: {
      type: String,
      default: 'button'
    },
    light: Boolean
  },
  setup(props, { attrs }) {
    // eslint-disable-next-line no-unused-vars -- string disabled must appear somewhere in the script for the analyzer to catch it
    const _ = 'disabled'

    const computedTag = computed(() => attrs.disabled ? 'button' : props.tag)
    const rootClasses = computed(() => {
      return [
        props.size,
        props.type,
        {
          'is-rounded': props.rounded,
          'is-loading': props.loading,
          'is-outlined': props.outlined,
          'is-fullwidth': props.expanded,
          'is-inverted': props.inverted,
          'is-focused': props.focused,
          'is-active': props.active,
          'is-hovered': props.hovered,
          'is-selected': props.selected,
          'is-light': props.light
        }
      ]
    })
    return { computedTag, rootClasses }
  }
}
</script>

<template>
  <component
    :is="computedTag"
    class="button"
    :type="nativeType"
    :class="rootClasses">
    <span v-if="label">{{ label }}</span>
    <slot />
  </component>
</template>
