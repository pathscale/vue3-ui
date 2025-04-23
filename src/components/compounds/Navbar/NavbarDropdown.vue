<script setup lang="ts">
import { computed, ref } from "vue";

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

const isActive = ref(props.active);

const closeMenu = () => {
  isActive.value = !props.closeOnClick;
};

const toggleActive = () => {
  isActive.value = !isActive.value;
};

const show = computed(() => {
  return !props.collapsible || (props.collapsible && isActive.value);
});
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
