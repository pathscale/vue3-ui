<template>
  <div class="container">
    <div class="columns is-vcentered">
      <div class="column is-one-fifth">
        <slot name="left" />
      </div>
      <div class="column">
        <slot name="main" />
      </div>
      <div class="column is-one-fifth">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
  const Columns ={
    name: 'Columns'
  };
  
  export default Columns;
</script>
