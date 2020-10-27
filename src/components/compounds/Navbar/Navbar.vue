<script>
import { computed, ref, watchEffect } from 'vue'
import NavbarBurger from './NavbarBurger.vue'

export default {
  name: 'VNavbar',
  components: { NavbarBurger },
  props: {
    type: [String, Object],
    transparent: Boolean,
    fixedTop: Boolean,
    fixedBottom: Boolean,
    wrapperClass: String,
    closeOnClick: { // TODO
      type: Boolean,
      default: true
    },
    mobileBurger: {
      type: Boolean,
      default: true
    },
    spaced: Boolean,
    shadow: Boolean,
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isActive = ref(props.modelValue)

    watchEffect(() => {
      emit('update:modelValue', isActive.value)
    })

    watchEffect(() => {
      isActive.value = props.modelValue
    })

    const toggleActive = () => {
      isActive.value = !isActive.value
    }

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
    })
    const menuClasses = computed(() => {
      return {
        'is-active': isActive.value,
      }
    })
    return { rootClasses, isActive, menuClasses, toggleActive }
  }
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" :class="rootClasses">
    <div class="navbar-brand">
      <slot name="brand" />
      <navbar-burger v-if="mobileBurger" :is-active="isActive" @click="toggleActive" />
    </div>
    <div class="navbar-menu" :class="menuClasses">
      <div class="navbar-start">
        <slot name="start" />
        <slot name="end" />
      </div>
      <div class="navbar-start">
        <slot name="start" />
        <slot name="end" />
      </div>
      <div class="navbar-end">
        <slot name="end" />
      </div>
    </div>
  </nav>
</template>
