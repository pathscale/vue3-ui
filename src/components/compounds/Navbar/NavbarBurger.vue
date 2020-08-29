<script>
const Component = {
    name: 'NavbarBurger',
    props: {
        isActive: Boolean
    }
}
export default Component
</script>

<template>
  <a
    role="button"
    class="navbar-burger burger"
    :class="{ 'is-active': isActive }"
    aria-label="menu"
    :aria-expanded="isActive">
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
</template>
