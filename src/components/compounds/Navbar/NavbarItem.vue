<script>
export default {
	name: "VNavbarItem",
	inheritAttrs: false,
	props: {
		tag: {
			type: String,
			default: "a",
		},
		active: Boolean,
	},
};
</script>

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
