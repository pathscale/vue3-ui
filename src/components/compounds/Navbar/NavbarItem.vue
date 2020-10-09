<script>
import { computed } from 'vue'

const Component = {
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

export default Component
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
