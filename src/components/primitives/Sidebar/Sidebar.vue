<script>
import { computed, reactive, watchEffect } from "vue";

export default {
  name: "VSidebar",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    type: [String, Object],
    overlay: Boolean,
    position: {
      type: String,
      default: "fixed",
    },
    fullheight: Boolean,
    fullwidth: Boolean,
    right: Boolean,
    mobile: String,
    reduce: Boolean,
    expandOnHover: Boolean,
    expandOnHoverFixed: Boolean,
    width: {
      type: [Number, String],
      default: 260,
    },
    miniWidth: {
      type: [Number, String],
      default: 80,
    },
  },
  emits: ["close", "update:open"],
  setup(props, { emit }) {
    const state = reactive({
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

    return {
      state,
      rootStyles,
      overlayAndOpen,
      isMiniExpandFixed,
      isMiniMobile,
      isHiddenMobile,
      isFullwidthMobile,
      isStatic,
      isFixed,
      isAbsolute,
      onClose,
    };
  },
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
