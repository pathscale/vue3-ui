<template>
  <div class="b-sidebar">
    <div
      class="sidebar-background"
      v-if="overlay && open" />
    <transition
      :name="state.transitionName"
      @before-enter="beforeEnter"
      @after-enter="afterEnter">
      <div
        v-show="open"
        ref="sidebarContent"
        class="sidebar-content"
        :class="rootClasses">
        <slot />
      </div>
    </transition>
  </div>
</template>

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
        expandOnHoverFixed: Boolean,
        canCancel: {
            type: [Array, Boolean],
        },
        onCancel: {
            type: Function,
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
            state.transitionName.value = !open ? 'slide-prev' : 'slide-next'
        })

        function beforeEnter() {
            state.animating.value = true
        }

        
        function afterEnter() {
            state.animating.value = false
        }

        return { state, rootClasses, cancelOptions, isStatic, isFixed, isAbsolute, beforeEnter, afterEnter }
    },
}

export default Sidebar
</script>