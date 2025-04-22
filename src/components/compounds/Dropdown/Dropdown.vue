<script setup lang="ts">
import { onClickOutside } from "@/utils/onClickOutside";
import { computed, provide, reactive, readonly, useTemplateRef } from "vue";
import { type DDSelection, DropdownSymbol } from "./dropdown-symbol";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    hoverable?: boolean;
    inline?: boolean;
    position?: "is-left" | "is-up" | "is-down" | "is-right";
    mobileModal?: boolean;
    ariaRole?: "list" | "menu" | "dialog";
    closeOnClick?: boolean;
    /** Full width */
    expanded?: boolean;
  }>(),
  {
    mobileModal: true,
    closeOnClick: true,
  },
);

const selected = defineModel();

const state = reactive({
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

// biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
const selectItem = (newValue: any) => {
  selected.value = newValue;
  closeMenu();
};

const show = computed(() => {
  return (
    (!props.disabled && (state.isActive || props.hoverable)) || props.inline
  );
});

const displayActive = computed(() => state.isActive || props.inline);

// provide item dropdown selection for children
provide<DDSelection>(DropdownSymbol, { selectItem, value: readonly(selected) });

// close dropdown on click outside
const dropdownWrapper = useTemplateRef<HTMLElement>("dropdown-wrapper");
onClickOutside(dropdownWrapper, () => {
  state.isActive = false;
});
</script>

<template>
  <div ref="dropdown-wrapper" class="dropdown" :class="[
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
