<script>
  const Columns ={
    name: 'VColumns'
  };
  
  export default Columns;
</script>

<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column">
        <slot name="left" />
      </div>
      <div class="column">
        <slot name="main" />
      </div>
      <div class="column">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
