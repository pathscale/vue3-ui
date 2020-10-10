<script>
import { watchEffect, reactive, computed } from 'vue'

export default {
  name: 'BNavbarDropdown',
  props: {
    label: String,
    hoverable: Boolean,
    active: Boolean,
    right: Boolean,
    arrowless: Boolean,
    boxed: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    collapsible: Boolean

  },
  setup(props) {
    const state = reactive(
      {
        newActive: props.active,
        isHoverable: props.hoverable,
      }
    )
    watchEffect(() => {
      state.newActive = props.active
    })

    function showMenu() {
      state.newActive = true
    }

    function closeMenu() {
      state.newActive = !props.closeOnClick
      if (props.hoverable && props.closeOnClick) {
        state.isHoverable = false
      }
    }
    function checkHoverable() {
      if (props.hoverable) {
        state.isHoverable = true
      }
    }

    const rootClasses = computed(() => {
      return {
        'is-hoverable': state.isHoverable,
        'is-active': state.newActive
      }
    })

    const linkClasses = computed(() => {
      return {
        'is-arrowless': props.arrowless,
        'is-active': state.newActive && props.collapsible
      }
    })

    const collapsibleClasses = computed(() => {
      return {
        'is-right': props.right,
        'is-boxed': props.boxed,
      }
    })

    const toggleActive = () => {
      state.newActive = !state.newActive
    }

    const show = computed(() => {
      return !props.collapsible || (props.collapsible && state.newActive)
    })
    return { state, showMenu, closeMenu, checkHoverable, rootClasses, linkClasses, collapsibleClasses, toggleActive, show }
  }
}
</script>

<template>
  <div
    class="navbar-item has-dropdown"
    :class="rootClasses"
    @mouseenter="checkHoverable"
    @focusout="closeMenu"
    tabindex="-1">
    <a
      class="navbar-link"
      :class="linkClasses"
      role="menuitem"
      aria-haspopup="true"
      href="#"
      @click.prevent="toggleActive">
      <template v-if="label">
        {{ label }}
      </template>
      <slot v-else name="label" />
    </a>
    <div
      v-show="show"
      class="navbar-dropdown"
      :class="collapsibleClasses">
      <slot />
    </div>
  </div>
</template>
