<script>
import { reactive, computed } from "vue"

const Accordion = {
  name: "VAccordion",
  props: {
    isHorizontal: Boolean,
    triggerRight: Boolean,
    triggerLeft: Boolean,
    expanded: Boolean,
    background: String,
    color: String,
    hover: Boolean,
    isLink: Boolean,
    isActive: Boolean,
    headerIsTrigger: Boolean
  },

  setup(props) {
    const state = reactive({
      isExpanded: props.expanded,
      style: {
        backgroundColor: props.background,
        color: props.color
      },
      hover: props.hover,
      isLink: props.isLink,
      headerIsTrigger: props.headerIsTrigger
    })
    const rootClasses = computed(() => {
      return [{
        'is-horizontal': props.isHorizontal,
        'is-vertical': !props.isHorizontal,
        'accordion-active': props.isActive && props.hover,
        'accordion-default': !props.isActive && props.hover,
				'accordion-type-hover': props.hover,
        'accordion-type-click': !props.hover
      }]
    })
    const headerClasses = computed(() => {
      return [{
        'header-is-trigger': props.headerIsTrigger
      }]
    })
    const triggerClasses = computed(() => {
      return [{
        'trigger-right': props.triggerRight,
        'trigger-left': props.triggerLeft
      }]
    })

    const { isActive } = props

    function toggle() {
      if (props.disabled) return
      state.isExpanded = !state.isExpanded
    }
    function open() {
      // separate function because of buggy css hover
      state.isExpanded = true
    }
    function close() {
      state.isExpanded = false
    }

    return { state, toggle, open, close, rootClasses, headerClasses, triggerClasses, isActive }
  }
}
export default Accordion
</script>

<template>
  <div :class="rootClasses" :style="state.style">
    <div
      role="button"
      ref="trigger"
      v-if="hover"
      class="accordion-trigger"
      @mouseover="open"
      @mouseleave="close">
      <slot name="trigger" />
      <span
        class="accordion-content">
        <slot name="content" />
      </span>
    </div>
    <div v-else>
      <div
        :class="headerClasses"
        class="accordion-header my-2" 
        @click="state.headerIsTrigger ? toggle() : null">
        <slot name="header" />
        <div
          role="button"
          ref="trigger"
          class="accordion-trigger-click"
          :class="triggerClasses"
          @click="state.headerIsTrigger ? null : toggle()">
          <slot name="trigger" />
        </div>
      </div>
      <div v-if="state.isExpanded">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
