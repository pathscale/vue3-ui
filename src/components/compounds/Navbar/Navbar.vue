<script>
import { computed } from 'vue'
import NavbarBurger from './NavbarBurger.vue'

const Component = {
    name: 'VNavbar',
    components: { NavbarBurger },
    props: {
        type: [String, Object],
        transparent: {
            type: Boolean,
            default: false
        },
        fixedTop: {
            type: Boolean,
            default: false
        },
        fixedBottom: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: false
        },
        wrapperClass: {
            type: String
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        mobileBurger: {
            type: Boolean,
            default: true
        },
        spaced: Boolean,
        shadow: Boolean
    },
    setup(props) {
        const rootClasses = computed(() => {
            return [
                props.type,
                {
                    'is-fixed-top': props.fixedTop,
                    'is-fixed-bottom': props.fixedBottom,
                    'is-spaced': props.spaced,
                    'has-shadow': props.shadow,
                    'is-transparent': props.transparent
                }
                ]
            }
        )
        return { rootClasses }
    }
}

export default Component
</script>
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" :class="rootClasses">
    <div class="navbar-brand">
      <slot name="brand" />
      <navbar-burger />
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <slot name="start" />
      </div><div class="navbar-end">
        <slot name="end" />
      </div>
    </div>
  </nav>
</template>
