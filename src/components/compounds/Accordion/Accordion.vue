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
    title: {
      type: String
    },
    content: {
      type: String
    }
  },

  setup(props) {
    const state = reactive({
      isExpanded: props.expanded,
      style: {}
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
  <div class="accordion" :class="rootClasses">
    <div
      role="button"
      ref="trigger"
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