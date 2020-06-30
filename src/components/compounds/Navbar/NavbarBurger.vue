<template>
  <a
    role="button"
    class="navbar-burger burger"
    :class="{ 'is-active': isOpened }"
    aria-label="menu"
    :aria-expanded="isOpened">
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
</template>

<script>
const Component = {
    name: 'NavbarBurger',
    props: {
        isOpened: {
            type: Boolean,
            default: false
        }
    }
}
export default Component
</script>
