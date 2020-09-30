<script>
import { reactive, computed } from "vue"

const Component = {
    name: 'VDropdown',
    props: {
      value: {
        type: [String, Number, Boolean, Object, Array, Function],
      },
      disabled: Boolean,
      hoverable: Boolean,
      inline: Boolean,
      position: {
        type: String,
      },
      mobileModal: {
        type: Boolean,
        default: true
      },
      ariaRole: String,
      closeOnClick: { 
        type: Boolean,
        default: true
      },
      expanded: Boolean,
    },

    setup(props) {
      const state = reactive({
        selected: props.value,
        style: {},
        isActive: false,
        isHoverable: props.hoverable,
      })

      const rootClasses = computed(() => {
        return [props.position, {
          'is-disabled': props.disabled,
          'is-hoverable': props.hoverable,
          'is-inline': props.inline,
          'is-active': state.isActive || props.inline,
          'is-mobile-modal': props.mobileModal,
          'is-expanded': props.expanded
        }]
      })

      function toggle() {
        if (props.disabled) return
        state.isActive = !state.isActive
      }

      function selectItem() {
        // TODO
        state.isActive = false
      }

      function closeMenu() {
        if (props.closeOnClick) {
          state.isActive = false
        }
      }

      return { state, toggle, rootClasses, selectItem, closeMenu}
    }
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
      tabindex="-1"
      @focusout="closeMenu">
      <slot name="trigger" />
    </div>
    <transition name="fade">
      <div 
        v-show="(!disabled && (state.isActive || hoverable)) || inline"
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
