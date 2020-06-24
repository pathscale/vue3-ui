<script>
  // import { reactive } from 'vue'  
  // import { VTextArea, VInput } from "../components"
  
  const App = {
    // components: { VTextArea, VInput },
    setup() {
      return {
        changeColor() {
          const root = document.documentElement;
          root.style.setProperty('--bulma-success', '#000000');
        }
      }
    }
  }

  export default App
</script>

<template>
  <div>
    <h1>I'm the playground</h1>
  </div>
  <!-- <div>
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
            <LoginFormPanel @login="changeColor" />
          </template>
        </ColumnsLayout>
      </div>
    </div>
  </div>   -->
</template>
