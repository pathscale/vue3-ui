<script>
  const Field = {
    name: 'Field',
    props: {
      label: {
        type: String,
        default: null,
      },
    },
  }
  
  export default Field;
</script>

<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <slot />
  </div>
</template>
