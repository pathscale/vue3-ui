<script>
const Component = {
  name: 'VMenuList',
  props: {
    label: String,
    ariaRole: String
  }
}
export default Component
</script>

<template>
  <p v-if="label" class="menu-label">
    {{ label }}
  </p>
  <ul class="menu-list" :role="ariaRole">
    <slot />
  </ul>
</template>
