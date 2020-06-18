<template>
  <NavLayout />

  <div class="hero is-fullheight">
    <div class="hero-body">

      <ColumnsLayout>
        <template v-slot:navbar-left>
          <a class="navbar-item">Home</a>
          <a class="navbar-item">Documentation</a>
        </template>
        <template v-slot:navbar-right>
          <a class="button is-primary">Sign up</a>
          <a class="button is-light">Log in</a>
        </template>
        <template v-slot:main>
          <LoginFormPanel />
        </template>
      </ColumnsLayout>

    </div>
  </div>
</template>

<script>
  import { ColumnsLayout, LoginFormPanel, NavLayout } from "../components"

  export default {
    components: { ColumnsLayout, NavLayout, LoginFormPanel }
  }
</script>
