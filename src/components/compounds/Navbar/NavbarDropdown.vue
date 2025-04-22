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

const newActive = ref(props.active);

const closeMenu = () => {
  newActive.value = !props.closeOnClick;
};

const toggleActive = () => {
  newActive.value = !newActive.value;
};

const show = computed(() => {
  return !props.collapsible || (props.collapsible && newActive.value);
});

const isActive = computed(() => newActive.value);
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
