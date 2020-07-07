<script>
import { reactive, computed, watchEffect } from "vue"


const Sidebar = {
    name: 'VSidebar',
    props: {
        open: Boolean,
        type: [String, Object],
        overlay: Boolean,
        position: {
            type: String,
            default: 'fixed',
        },
        fullheight: Boolean,
        fullwidth: Boolean,
        right: Boolean,
        mobile: {
            type: String
        },
        reduce: Boolean,
        expandOnHover: Boolean,
        expandOnHoverFixed: Boolean, // TODO
        canCancel: {
            type: [Array, Boolean],
        },
        onCancel: {
            type: Function, // TODO
        },
        width: {
            type: [Number, String],
            default: 260
        },
        miniWidth: {
            type: [Number, String],
            default: 80
        }
    },
    setup(props) {
        const state = reactive({
            transitionName: null,
            animating: true
        })

        const rootClasses = computed(() => {
            return [props.type, {
                'is-fixed': props.isFixed,
                'is-static': props.isStatic,
                'is-absolute': props.isAbsolute,
                'is-fullheight': props.fullheight,
                'is-fullwidth': props.fullwidth,
                'is-right': props.right,
                'is-mini': props.reduce,
                'is-mini-expand': props.expandOnHover,
                'is-mini-expand-fixed': props.expandOnHover && props.expandOnHoverFixed,
                'is-mini-mobile': props.mobile === 'reduce',
                'is-hidden-mobile': props.mobile === 'hide',
                'is-fullwidth-mobile': props.mobile === 'fullwidth'
            }]
        })

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
        
        watchEffect(() => {
            const open = props.right ? !props.open : props.open
            state.transitionName = !open ? 'slide-right' : 'slide-left'
        })

        return { state, rootClasses, rootStyles, cancelOptions, isStatic, isFixed, isAbsolute }
    },
}

export default Sidebar
</script>
<template>
  <div class="v-sidebar">
    <div
      class="sidebar-background"
      v-if="overlay && open" />
    <transition
      :name="state.transitionName">
      <div
        v-show="open"
        ref="sidebarContent"
        class="sidebar-content is-width-animated"
        :class="rootClasses"
        :style="rootStyles">
        <slot />
      </div>
    </transition>
  </div>
</template>