<script>
  import ColumnsLayout from "../components/ColumnsLayout.vue";
  import LoginFormPanel from "../components/LoginFormPanel.vue"
  import NavLayout from "../components/NavLayout.vue"

  const App = {
    components: { ColumnsLayout, NavLayout, LoginFormPanel },
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
  </div>  
</template>
