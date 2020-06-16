<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <slot name="navbar-left"></slot>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <slot name="navbar-right"></slot>
          </div>
        </div>
      </div>
    </div>
  </nav>


  <div class="container">
    <div class="columns is-vcentered">
      <div class="column is-one-quarter is-red">
        <slot name="left"></slot>
      </div>
      <div class="column">
        <slot name="main"></slot>
      </div>
      <div class="column is-one-quarter">
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
