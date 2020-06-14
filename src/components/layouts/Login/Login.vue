<script>
  import LoginForm from '../../panels/LoginForm/LoginForm.vue';
  import { useState } from '../../../state';

  const Login = {
    components: { LoginForm },
    setup() {
      const state = useState();

      const sendLogin = ({ email }) => {
        if (state) {
          state.isLoggedIn = true;
          state.email = email;
        }
      };

      return { sendLogin };
    }
  };

  export default Login;
</script>

<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-5-tablet is-4-desktop is-3-widescreen">
        <LoginForm @login="sendLogin" />
      </div>
    </div>
  </div>
</template>
