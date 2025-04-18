<script>
export default {
	name: "VMenuList",
	props: {
		label: String,
		ariaRole: String,
	},
};
</script>

<template>
  <p v-if="label" class="menu-label">
    {{ label }}
  </p>
  <ul class="ul menu-list" :role="ariaRole">
    <slot />
  </ul>
</template>
