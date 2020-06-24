<script>
const Component ={
  name: 'VCardHeader',
  props: {
    title: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: 'header'
    }

  }
}
export default Component;
</script>

<template>
  <component
    :is="tag"
    class="card-header">
    <p v-if="title" class="card-header-title">
      {{ title }}
    </p>
    <slot />
  </component>
</template>
