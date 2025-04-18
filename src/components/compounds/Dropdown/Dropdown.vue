<script>
import { computed, provide, reactive } from "vue";

export const DropdownSymbol = Symbol("Dropdown");

export default {
  name: "VDropdown",
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
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const state = reactive({
      selected: props.value,
      style: {},
      isActive: false,
      isHoverable: props.hoverable,
    });

    const toggle = () => {
      if (props.disabled || props.hoverable) return;
      state.isActive = !state.isActive;
    };

    const closeMenu = () => {
      if (props.closeOnClick) {
        state.isActive = false;
      }
    };

    const selectItem = (newValue) => {
      emit("update:modelValue", newValue);
      closeMenu();
    };

    const show = computed(() => {
      return (
        (!props.disabled && (state.isActive || props.hoverable)) || props.inline
      );
    });

    const displayActive = computed(() => state.isActive || props.inline);

    provide(DropdownSymbol, { selectItem, value: props.value });

    return { state, toggle, show, displayActive };
  },
};
</script>

<template>
  <div class="dropdown" :class="[
    position,
    {
      'is-disabled': disabled,
      'is-hoverable': hoverable,
      'is-inline': inline,
      'is-active': displayActive,
      'is-mobile-modal': mobileModal,
      'is-expanded': expanded,
    },
  ]">
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
