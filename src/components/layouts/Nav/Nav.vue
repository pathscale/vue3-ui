<script>
  const Nav = {
    name: 'Nav'
  };

  export default Nav;
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <slot name="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>
      </slot>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <slot name="navbar-left" />
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <slot name="navbar-right" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
