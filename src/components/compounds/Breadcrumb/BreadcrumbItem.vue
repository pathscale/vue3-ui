<script>

const Component = {
  name: 'VBreadcrumb',
  props: {
    inheritAttrs: false,
    props: {
      tag: {
        type: String,
        default: 'a'
      },
      active: Boolean
    }
  }
}

export default Component;
</script>

<template>
  <li>
    <component :is="tag" href="#" :class="[{'is-active': active}]">
      <slot />
    </component>
  </li>
</template>
