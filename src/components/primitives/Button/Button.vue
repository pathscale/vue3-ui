<script>
import { computed } from 'vue'

export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'is-primary',
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
      default: 'button',
    },
    tag: {
      type: String,
      default: 'button',
    },
    light: Boolean,
  },
  setup(props, { attrs }) {
    const computedTag = computed(() => (attrs.disabled ? 'button' : props.tag))
    return { computedTag }
  },
}
</script>

<template>
  <component
    :is="computedTag"
    class="button"
    :type="nativeType"
    :class="[
      size,
      type,
      {
        'is-rounded': rounded,
        'is-loading': loading,
        'is-outlined': outlined,
        'is-fullwidth': expanded,
        'is-inverted': inverted,
        'is-focused': focused,
        'is-active': active,
        'is-hovered': hovered,
        'is-selected': selected,
        'is-light': light,
      },
    ]">
    <span v-if="label">{{ label }}</span>
    <slot />
  </component>
</template>
