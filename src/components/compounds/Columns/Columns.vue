<script>
export default {
  name: 'VColumns',
  props: {
    mobile: Boolean,
    desktop: Boolean,
    gapless: Boolean,
    gap: String,
    multiline: Boolean,
    hcentered: Boolean,
    vcentered: Boolean,
  },
}
</script>

<template>
  <div class="columns" :class="[
    gap,
    {
      'is-mobile': mobile,
      'is-desktop': desktop,
      'is-gapless': gapless,
      'is-variable': gap,
      'is-vcentered': vcentered,
      'is-multiline': multiline,
      'is-centered': hcentered,
    }
  ]">
    <slot />
  </div>
</template>
