<template>
  <div class="container">
    <div class="columns is-vcentered">
      <div class="column is-one-fifth">
        <slot name="left"></slot>
      </div>
      <div class="column">
        <slot name="main"></slot>
      </div>
      <div class="column is-one-fifth">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Columns'
  };
</script>
