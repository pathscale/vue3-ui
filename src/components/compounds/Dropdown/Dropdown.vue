<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import type { InjectionKey } from "vue";

// todo close on click outside

const props = withDefaults(
  defineProps<{
    // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
    modelValue?: any;
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

const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  selected: props.modelValue,
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
  emit("update:modelValue", newValue);
  closeMenu();
};

const show = computed(() => {
  return (
    (!props.disabled && (state.isActive || props.hoverable)) || props.inline
  );
});

const displayActive = computed(() => state.isActive || props.inline);

// provide item dropdown selection for children
export type DDSelection = {
  value: typeof props.modelValue;
  selectItem: typeof selectItem;
};

export const DropdownSymbol = Symbol("Dropdown") as InjectionKey<DDSelection>;

provide(DropdownSymbol, { selectItem, value: props.modelValue });
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
