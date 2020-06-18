<script>
  import { ColumnsLayout, LoginFormPanel, NavLayout } from "../components"

  const App = {
    components: { ColumnsLayout, NavLayout, LoginFormPanel }
  }

  export default App
</script>

<template>
  <NavLayout />
  <div class="hero is-fullheight">
    <div class="hero-body">
      <ColumnsLayout>
        <template #navbar-left>
          <a class="navbar-item">Home</a>
          <a class="navbar-item">Documentation</a>
        </template>
        <template #navbar-right>
          <a class="button is-primary">Sign up</a>
          <a class="button is-light">Log in</a>
        </template>
        <template #main>
          <LoginFormPanel />
        </template>
      </ColumnsLayout>
    </div>
  </div>
</template>
