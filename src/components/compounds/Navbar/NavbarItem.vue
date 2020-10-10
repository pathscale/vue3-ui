<script>
import { computed } from 'vue'

export default {
  name: 'VNavbarItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    active: Boolean
  },
  setup(props) {
    const rootClasses = computed(() => {
      return {
        'is-active': props.active
      }
    })
    return { rootClasses }
  }
}
</script>

<template>
  <component
    :is="tag"
    class="navbar-item"
    :class="rootClasses"
    v-bind="$attrs">
    <slot />
  </component>
</template>
