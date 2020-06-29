<script>
import { reactive, computed } from "vue"

const Component = {
    name: 'VDropdown',
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        disabled: Boolean,
        hoverable: Boolean,
        inline: Boolean,
        position: {
            type: String,
        },
        mobileModal: {
            type: Boolean,
        },
        ariaRole: {
            type: String,
            default: null
        },
        animation: {
            type: String,
            default: 'fade'
        },
        closeOnClick: {  // TODO Pending
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
            'is-mobile-modal': props.isMobileModal,
            'is-expanded': props.expanded
        }]
      })

      function toggle() {
        if (props.disabled) return
        state.isActive = !state.isActive
      }

      /**
        * Click listener from DropdownItem.
        *   1. Set new selected item.
        *   2. Emit input event to update the user v-model.
        *   3. Close the dropdown.
      */

      function selectItem() {
        // TODO
        state.isActive = false
      }

      return { state, toggle, rootClasses, selectItem}
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
      aria-haspopup="true">
      <slot name="trigger" />
    </div>
    <transition :name="animation">
      <div 
        v-show="(!disabled && (state.isActive || hoverable)) || inline"
        class="dropdown-menu" 
        role="menu" 
        :aria-hidden="!state.isActive">
        <div class="dropdown-content" :role="ariaRole" @click="selectItem">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
