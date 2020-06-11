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
  <LoginForm @login="sendLogin" />
</template>
