<script>
const Component = {
    name: 'VMenuList',
    functional: true,
    props: {
        label: String,
        ariaRole: {
            type: String,
            default: ''
        }
    }
}
export default Component
</script>

<template>
  <p v-if="label" class="menu-label">
    {{ label }}
  </p>
  <ul class="menu-list" :role="ariaRole === 'menu' ? ariaRole : null">
    <slot />
  </ul>
</template>