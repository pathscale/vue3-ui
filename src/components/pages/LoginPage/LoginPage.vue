<script>
  import LoginForm from '../../views/LoginForm/LoginForm.vue';
  import { useState } from '../../../state';

  const LoginPage = {
    components: { LoginForm },
    setup() {
      const state = useState();

      const sendLogin = ({ email }) => {
        // console.log('login', email);
        if (state) {
          state.isLoggedIn = true;
          state.email = email;
        }
      };

      return { sendLogin };
    }
  };
  export default LoginPage;
</script>

<template>
  <LoginForm @login="sendLogin" />
</template>
