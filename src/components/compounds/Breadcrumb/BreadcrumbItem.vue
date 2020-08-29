<script>

const Component = {
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

export default Component;
</script>

<template>
  <li>
    <component
      :is="tag"
      :class="{
        'is-active': active
      }"
      v-bind="$attrs">
      <slot />
    </component>
  </li>
</template>
