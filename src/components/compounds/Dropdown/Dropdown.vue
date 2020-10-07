<script>
import { reactive, computed, provide } from 'vue'

export const DropdownSymbol = Symbol('Dropdown')

const Component = {
  name: 'VDropdown',
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
    },
    disabled: Boolean,
    hoverable: Boolean,
    inline: Boolean,
    position: String,
    mobileModal: {
      type: Boolean,
      default: true,
    },
    ariaRole: String,
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    expanded: Boolean,
  },

  setup(props, { emit }) {
    const state = reactive({
      selected: props.value,
      style: {},
      isActive: false,
      isHoverable: props.hoverable,
    })

    const rootClasses = computed(() => {
      return [
        props.position,
        {
          'is-disabled': props.disabled,
          'is-hoverable': props.hoverable,
          'is-inline': props.inline,
          'is-active': state.isActive || props.inline,
          'is-mobile-modal': props.mobileModal,
          'is-expanded': props.expanded,
        },
      ]
    })

    const toggle = () => {
      if (props.disabled) return
      state.isActive = !state.isActive
    }

    const closeMenu = () => {
      if (props.closeOnClick) {
        state.isActive = false
      }
    }

    const selectItem = newValue => {
      emit('update:modelValue', newValue)
      closeMenu()
    }

    const show = computed(() => {
      return (!props.disabled && (state.isActive || props.hoverable)) || props.inline
    })

    provide(DropdownSymbol, { selectItem, value: props.value })

    return { state, toggle, rootClasses, selectItem, closeMenu, show }
  },
}

export default Component
</script>

<template>
  <div class="dropdown" :class="rootClasses">
    <div
      role="button"
      ref="trigger"
      class="dropdown-trigger"
      @click="toggle"
      aria-haspopup="true"
      tabindex="-1">
      <slot name="trigger" />
    </div>
    <transition name="fade">
      <div
        v-show="show"
        class="dropdown-menu"
        role="menu"
        :aria-hidden="!state.isActive">
        <div class="dropdown-content" :role="ariaRole">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
