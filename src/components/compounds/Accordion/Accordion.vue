<script>
import { computed, reactive } from "vue";

export default {
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
    headerIsTrigger: Boolean,
  },

  setup(props) {
    const state = reactive({
      isExpanded: props.expanded,
      style: {
        backgroundColor: props.background,
        color: props.color,
      },
      hover: props.hover,
      isLink: props.isLink,
      headerIsTrigger: props.headerIsTrigger,
    });

    const toggle = (isHeaderTrigger) => {
      if (props.disabled) return;

      if (
        (isHeaderTrigger && props.headerIsTrigger) ||
        !props.headerIsTrigger
      ) {
        state.isExpanded = !state.isExpanded;
      }
    };

    // separate function because of buggy css hover
    const open = () => {
      state.isExpanded = true;
    };

    const close = () => {
      state.isExpanded = false;
    };

    const displayActive = computed(() => props.isActive && props.hover);

    const displayDefault = computed(() => !props.isActive && props.hover);

    return { state, toggle, open, close, displayActive, displayDefault };
  },
};
</script>

<template>
  <div :class="[{
    'is-horizontal': isHorizontal,
    'is-vertical': !isHorizontal,
    'accordion-active': displayActive,
    'accordion-default': displayDefault,
    'accordion-type-hover': hover,
    'accordion-type-click': !hover
  }]" :style="state.style">
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
        :class="{
          'header-is-trigger': headerIsTrigger
        }"
        class="accordion-header"
        @click="toggle(state.headerIsTrigger)">
        <slot name="header" />
        <div
          role="button"
          ref="trigger"
          class="accordion-trigger-click"
          :class="{
            'trigger-right': triggerRight,
            'trigger-left': triggerLeft
          }"
          @click="toggle(!state.headerIsTrigger)">
          <slot name="trigger" />
        </div>
      </div>
      <div v-if="state.isExpanded">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
