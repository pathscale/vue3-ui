<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Field',
    props: {
      label: {
        type: String,
      },
    },
  }
</script>




