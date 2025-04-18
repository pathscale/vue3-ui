<script>
export default {
	name: "NavbarBurger",
	props: {
		active: Boolean,
	},
};
</script>

<template>
  <a
    role="button"
    class="navbar-burger burger"
    :class="{
      'is-active': active
    }"
    aria-label="menu"
    :aria-expanded="active">
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
</template>
