<script setup lang="ts">
// todo add docs about this component to https://vue3.dev/documentation

import { computed, reactive, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    type?: string | object;
    overlay?: boolean;
    position?: "static" | "fixed" | "absolute";
    fullheight?: boolean;
    fullwidth?: boolean;
    right?: boolean;
    mobile?: "reduce" | "hide" | "fullwidth";
    reduce?: boolean;
    expandOnHover?: boolean;
    expandOnHoverFixed?: boolean;
    width?: number | string;
    miniWidth?: number | string;
  }>(),
  {
    open: true,
    position: "fixed",
    width: 260,
    miniWidth: 80,
  },
);

const emit = defineEmits(["close", "update:open"]);

type State = {
  transitionName: "slide-right" | "slide-left" | null;
  animating: boolean;
};

const state = reactive<State>({
  transitionName: null,
  animating: true,
});

const isMiniExpandFixed = computed(
  () => props.expandOnHover && props.expandOnHoverFixed,
);
const isMiniMobile = computed(() => props.mobile === "reduce");
const isHiddenMobile = computed(() => props.mobile === "hide");
const isFullwidthMobile = computed(() => props.mobile === "fullwidth");

const rootStyles = computed(() => {
  return `width: ${props.reduce ? props.miniWidth : props.width}px`;
});

const isStatic = computed(() => {
  return props.position === "static";
});

const isFixed = computed(() => {
  return props.position === "fixed";
});
const isAbsolute = computed(() => {
  return props.position === "absolute";
});
const overlayAndOpen = computed(() => {
  return props.overlay && props.open;
});

watchEffect(() => {
  const open = props.right ? !props.open : props.open;
  state.transitionName = open ? "slide-right" : "slide-left";
});

const onClose = () => {
  emit("update:open", false);
  emit("close");
};
</script>

<template>
  <div class="v-sidebar">
    <div class="sidebar-background" v-if="overlayAndOpen" @click="onClose" />
    <transition :name="state.transitionName">
      <div
        v-if="open"
        class="sidebar-content is-width-animated"
        :class="[
          type,
          {
            'is-fixed': isFixed,
            'is-static': isStatic,
            'is-absolute': isAbsolute,
            'is-fullheight': fullheight,
            'is-fullwidth': fullwidth,
            'is-right': right,
            'is-mini': reduce,
            'is-mini-expand': expandOnHover,
            'is-mini-expand-fixed': isMiniExpandFixed,
            'is-mini-mobile': isMiniMobile,
            'is-hidden-mobile': isHiddenMobile,
            'is-fullwidth-mobile': isFullwidthMobile,
          },
        ]"
        :style="rootStyles">
        <slot />
      </div>
    </transition>
  </div>
</template>
