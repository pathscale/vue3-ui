<script>
export default {
	name: "VBreadcrumb",
	props: {
		alignment: String,
		separator: String,
		size: String,
	},
};
</script>

<template>
  <nav class="breadcrumb" :class="[alignment, separator, size]" aria-label="breadcrumbs">
    <ul class="ul">
      <slot />
    </ul>
  </nav>
</template>
