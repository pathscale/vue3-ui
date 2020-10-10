<script>
export default {
  name: 'VBreadcrumbItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    active: Boolean
  }
}
</script>

<template>
  <li :class="{
    'is-active': active
  }">
    <component
      :is="tag"
      v-bind="$attrs">
      <slot />
    </component>
  </li>
</template>
