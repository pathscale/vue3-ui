<script>
import { computed } from 'vue'

export default {
  name: 'NavbarBurger',
  props: {
    isActive: Boolean
  },
  setup(props) {
    const rootClasses = computed(() => {
      return {
        'is-active': props.isActive
      }
    })
    return { rootClasses }
  }
}
</script>

<template>
  <a
    role="button"
    class="navbar-burger burger"
    :class="rootClasses"
    aria-label="menu"
    :aria-expanded="isActive">
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
</template>
