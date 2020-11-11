<script>
export default {
  name: 'NavbarBurger',
  props: {
    isActive: Boolean
  },
}
</script>

<template>
  <a
    role="button"
    class="navbar-burger burger"
    :class="{
      'is-active': isActive
    }"
    aria-label="menu"
    :aria-expanded="isActive">
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
</template>
