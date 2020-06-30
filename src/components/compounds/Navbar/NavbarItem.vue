<template>
  <component
    :is="tag"
    class="navbar-item"
    :class="{
      'is-active': active
    }"
    v-bind="$attrs">
    <slot />
  </component>
</template>

<script>

const Component = {
    name: 'VNavbarItem',
    inheritAttrs: false,
    props: {
        tag: {
            type: String,
            default: 'a'
        },
        active: Boolean
    }
}
export default Component
</script>
