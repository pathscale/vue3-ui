<script setup lang="ts">
import NavbarBurger from "./NavbarBurger.vue";

withDefaults(
  defineProps<{
    type?: string; // todo union
    transparent?: boolean;
    fixedTop?: boolean;
    fixedBottom?: boolean;
    wrapperClass?: string;
    mobileBurger?: boolean;
    spaced?: boolean;
    shadow?: boolean;
  }>(),
  {
    mobileBurger: true,
  },
);

const isActive = defineModel<boolean>();

const toggleActive = () => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" :class="[
    type,
    {
      'is-fixed-top': fixedTop,
      'is-fixed-bottom': fixedBottom,
      'is-spaced': spaced,
      'has-shadow': shadow,
      'is-transparent': transparent
    },
    wrapperClass
  ]">
    <div class="navbar-brand">
      <slot name="brand" />
      <navbar-burger v-if="mobileBurger" :is-active="isActive" @click="toggleActive" />
    </div>
    <div class="navbar-menu" :class="{
      'is-active': isActive,
    }">
      <div class="navbar-start">
        <slot name="start" />
      </div><div class="navbar-end">
        <slot name="end" />
      </div>
    </div>
  </nav>
</template>
