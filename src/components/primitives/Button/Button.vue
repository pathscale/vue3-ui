<script>
import { computed } from 'vue'
// import { useGlobalSettings } from '../../global-settings';

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
  /*
  const settings = useGlobalSettings()
  const computedRounded = computed(() => props.rounded === null && settings ? settings.button.rounded : props.rounded)
  */
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
