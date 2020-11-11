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
    props.gap,
    {
      'is-mobile': props.mobile,
      'is-desktop': props.desktop,
      'is-gapless': props.gapless,
      'is-variable': props.gap,
      'is-vcentered': props.vcentered,
      'is-multiline': props.multiline,
      'is-centered': props.hcentered,
    }
  ]">
    <slot />
  </div>
</template>
