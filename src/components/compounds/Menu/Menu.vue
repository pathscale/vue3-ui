<template>
  <div class="menu">
    <slot />
  </div>
</template>

<script>
const Component = {
    name: 'VMenu',
    props: {
        accordion: {
            type: Boolean,
            default: true
        },
        activable: {
            type: Boolean,
            default: true
        }
    },
}
export default Component
</script>
