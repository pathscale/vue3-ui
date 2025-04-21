<script setup lang="ts">
import { computed, inject } from "vue";
import { type DDSelection, DropdownSymbol } from "./Dropdown.vue";

const props = withDefaults(
  defineProps<{
    // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
    value?: any;
    separator?: boolean;
    disabled?: boolean;
    custom?: boolean;
    focusable?: boolean;
    paddingless?: boolean;
    hasLink?: boolean;
    ariaRole?: "listitem" | "menuitem";
  }>(),
  {
    focusable: true,
  },
);

const ariaRoleItem = computed(() => {
  return props.ariaRole === "menuitem" || props.ariaRole === "listitem"
    ? props.ariaRole
    : undefined;
});

const isClickable = computed(() => {
  return !props.separator && !props.disabled && !props.custom;
});

const isActive = computed(() => {
  return false; // TODO
});

const isFocusable = computed(() => {
  return props.hasLink ? false : props.focusable;
});

const tabIndex = computed(() => {
  return isFocusable.value ? 0 : undefined;
});

const dropdownLink = computed(() => {
  return !props.custom && !props.hasLink;
});

const { selectItem: reportParent } = inject(DropdownSymbol) as DDSelection;

const selectItem = () => {
  if (!isClickable.value) return;
  reportParent(props.value);
};

const itemIsBlock = computed(() => !props.hasLink);
</script>

<template>
  <hr v-if="separator" class="dropdown-divider" />
  <a
    v-else-if="dropdownLink"
    class="dropdown-item"
    :class="{
      'is-disabled': disabled,
      'is-paddingless': paddingless,
      'is-active': isActive,
    }"
    @click="selectItem"
    :role="ariaRoleItem"
    :tabindex="tabIndex">
    <slot />
  </a>
  <div
    v-else
    :class="{
      'dropdown-item': itemIsBlock,
      'is-disabled': disabled,
      'is-paddingless': paddingless,
      'is-active': isActive,
      'has-link': hasLink,
    }"
    @click="selectItem"
    :role="ariaRoleItem"
    :tabindex="tabIndex">
    <slot />
  </div>
</template>
