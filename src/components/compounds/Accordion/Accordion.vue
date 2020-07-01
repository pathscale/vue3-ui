<script>
import { reactive, computed } from "vue"

const Accordion = {
  name: "VAccordion",
  props: {
    isHorizontal: {
      type: Boolean
    },
    animation: {
      type: String,
      default: 'fade'
    },
    expanded: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
    },
    color: {
      type: String
    },
    hover: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const state = reactive({
      isExpanded: props.expanded,
      style: {
        backgroundColor: props.background,
        color: props.color
      },
      hover: props.hover
    })
    const rootClasses = computed(() => {
      return [{
        'is-horizontal': props.isHorizontal,
        'is-vertical': !props.isHorizontal
      }]
    })

    function toggle() {
      if (props.disabled) return
      state.isExpanded = !state.isExpanded
    }
    return { state, toggle, rootClasses }
  }
}
export default Accordion
</script>

<template>
  <div class="accordion" :class="rootClasses" :style="state.style">
    <div
      role="button"
      ref="trigger"
      v-if="hover"
      class="accordion-trigger"
      @mouseover="toggle"
      @mouseleave="toggle">
      <slot name="trigger" />
    </div>
    <div
      role="button"
      ref="trigger"
      v-else
      class="accordion-trigger"
      @click="toggle">
      <slot name="trigger" />
    </div>
    <transition :name="animation">
      <div 
        class="accordion-content" 
        v-show="state.isExpanded"
        :aria-hidden="!state.isExpanded">
        <slot />
      </div>
    </transition>
  </div>
</template>
