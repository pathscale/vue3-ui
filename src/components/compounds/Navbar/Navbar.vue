<script>
import { ref, watchEffect } from 'vue'
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

    return { isActive, toggleActive }
  }
}
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
    }
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
