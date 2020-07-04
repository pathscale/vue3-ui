<script>
import { reactive, computed } from "vue"

const Accordion = {
  name: "VAccordion",
  props: {
    isHorizontal: {
      type: Boolean
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
    },
    isLink: {
      type: Boolean,
      default: false
    },
    to: {
      type: Object,
      default: null
    }
  },

  setup(props) {
    const state = reactive({
      isExpanded: props.expanded,
      style: {
        backgroundColor: props.background,
        color: props.color
      },
      hover: props.hover,
      isLink: props.isLink
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
    function open() {
      // separate function because of buggy css hover
      state.isExpanded = true
    }
    function close() {
      state.isExpanded = false
    }

    return { state, toggle, open, close, rootClasses }
  }
}
export default Accordion
</script>

<template>
  <div class="accordion1" :class="rootClasses" :style="state.style">
    <div
      role="button"
      ref="trigger"
      v-if="hover"
      class="accordion-trigger1"
      @mouseover="open"
      @mouseleave="close">
      <slot name="trigger" />
      <span 
        class="accordion-content1" 
        v-show="state.isExpanded"
        :aria-hidden="!state.isExpanded">
        <slot name="content" />
      </span>
    </div>
    <div
      role="button"
      ref="trigger"
      v-else
      class="accordion-trigger1"
      @click="toggle">
      <slot name="trigger" />
    </div>
  </div>
</template>

<style>
.accordion-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 320px;
}
.accordion1 {
  flex: 1;
  height: 100%;
  -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  transition: flex 0.8s ease;
}
.accordion1 .accordion-trigger1 {
  display: flex;
  align-items: center;
  justify-content: inherit;
  line-height: normal;
  position: relative;
  min-width: 32px;
  padding: 0px 10px;
  height: 100%;
  width: 100%;
  border-radius: 0;
}
.accordion1:hover {
  flex: 4;
  background-color: #292929;
}
.accordion-menu:hover {
  width: 320px;
}
.accordion-content1 {
  padding: 0px 8px;
}
</style>
