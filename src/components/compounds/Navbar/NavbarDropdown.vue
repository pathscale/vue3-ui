<script>
import { watchEffect, reactive } from "vue"

const Component = {
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
    return { state, showMenu, closeMenu, checkHoverable }
  }
}

export default Component
</script>

<template>
  <div
    class="navbar-item has-dropdown"
    :class="{
      'is-hoverable': state.isHoverable,
      'is-active': state.newActive
    }"
    @mouseenter="checkHoverable"
    @focusout="closeMenu"
    tabindex="-1">
    <a
      class="navbar-link"
      :class="{
        'is-arrowless': arrowless,
        'is-active': state.newActive && collapsible
      }"
      role="menuitem"
      aria-haspopup="true"
      href="#"
      @click.prevent="state.newActive = !state.newActive">
      <template v-if="label">
        {{ label }}
      </template>
      <slot v-else name="label" />
    </a>
    <div
      v-show="!collapsible || (collapsible && state.newActive)"
      class="navbar-dropdown"
      :class="{
        'is-right': right,
        'is-boxed': boxed,
      }">
      <slot />
    </div>
  </div>
</template>
