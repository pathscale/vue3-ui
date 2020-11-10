<script>
import { reactive, computed, watchEffect } from 'vue'

export default {
  name: 'VSidebar',
  props: {
    open: Boolean, // TODO Add support to .sync
    type: [String, Object],
    overlay: Boolean,
    position: {
      type: String,
      default: 'fixed',
    },
    fullheight: Boolean,
    fullwidth: Boolean,
    right: Boolean,
    mobile: String,
    reduce: Boolean,
    expandOnHover: Boolean,
    expandOnHoverFixed: Boolean, // TODO
    canCancel: Boolean, // TODO
    onCancel: {
      type: Function, // TODO
    },
    width: {
      type: [Number, String],
      default: 260,
    },
    miniWidth: {
      type: [Number, String],
      default: 80,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const state = reactive({
      transitionName: null,
      animating: true,
    })

    const isMiniExpandFixed = computed(() => props.expandOnHover && props.expandOnHoverFixed)
    const isMiniMobile = computed(() => props.mobile === 'reduce')
    const isHiddenMobile = computed(() => props.mobile === 'hide')
    const isFullwidthMobile = computed(() => props.mobile === 'fullwidth')

    const rootStyles = computed(() => {
      return `width: ${props.reduce ? props.miniWidth : props.width}px`
    })

    const cancelOptions = computed(() => {
      return typeof props.canCancel === 'boolean'
        ? props.canCancel
          ? ['escape', 'outside']
          : []
        : props.canCancel
    })
    const isStatic = computed(() => {
      return props.position === 'static'
    })

    const isFixed = computed(() => {
      return props.position === 'fixed'
    })
    const isAbsolute = computed(() => {
      return props.position === 'absolute'
    })
    const overlayAndOpen = computed(() => {
      return props.overlay && props.open
    })
    watchEffect(() => {
      const open = props.right ? !props.open : props.open
      state.transitionName = open ? 'slide-right' : 'slide-left'
    })

    return {
      state,
      rootStyles,
      cancelOptions,
      emit,
      overlayAndOpen,
      isMiniExpandFixed,
      isMiniMobile,
      isHiddenMobile,
      isFullwidthMobile,
      isStatic,
      isFixed,
      isAbsolute,
    }
  },
}
</script>

<template>
  <div class="v-sidebar">
    <div class="sidebar-background" v-if="overlayAndOpen" @click="emit('close')" />
    <transition :name="state.transitionName">
      <div
        v-if="open"
        ref="sidebarContent"
        class="sidebar-content is-width-animated"
        :class="[
          props.type,
          {
            'is-fixed': isFixed,
            'is-static': isStatic,
            'is-absolute': isAbsolute,
            'is-fullheight': props.fullheight,
            'is-fullwidth': props.fullwidth,
            'is-right': props.right,
            'is-mini': props.reduce,
            'is-mini-expand': props.expandOnHover,
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
