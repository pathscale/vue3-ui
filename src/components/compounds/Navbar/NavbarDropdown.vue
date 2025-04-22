<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    hoverable?: boolean;
    active?: boolean;
    right?: boolean;
    arrowless?: boolean;
    boxed?: boolean;
    closeOnClick?: boolean;
    collapsible?: boolean;
  }>(),
  {
    closeOnClick: true,
  },
);

const state = reactive({
  newActive: props.active,
});

watchEffect(() => {
  state.newActive = props.active;
});

const closeMenu = () => {
  state.newActive = !props.closeOnClick;
};

const toggleActive = () => {
  state.newActive = !state.newActive;
};

const show = computed(() => {
  return !props.collapsible || (props.collapsible && state.newActive);
});

const isActive = computed(() => state.newActive);
</script>

<template>
  <div
    class="navbar-item has-dropdown"
    :class="{
      'is-hoverable': hoverable,
      'is-active': isActive,
    }"
    @focusout="closeMenu"
    tabindex="-1">
    <a
      class="navbar-link"
      :class="{
        'is-arrowless': arrowless,
        'is-active': isActive,
      }"
      role="menuitem"
      aria-haspopup="true"
      href="#"
      @click.prevent="toggleActive">
      <template v-if="label">
        {{ label }}
      </template>
      <slot v-else name="label" />
    </a>
    <div
      v-show="show"
      class="navbar-dropdown"
      :class="{
        'is-right': right,
        'is-boxed': boxed,
      }">
      <slot />
    </div>
  </div>
</template>
