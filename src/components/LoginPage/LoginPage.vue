<script>
  import LoginForm from './LoginForm.vue';
  import { useState } from './state';

  export default {
    components: { LoginForm },
    setup() {
      const state = useState();

      const sendLogin = ({ email }) => {
        console.log('login', email);
        if (state) {
          state.isLoggedIn = true;
          state.email = email;
        }
      };

      return { sendLogin };
    }
  }
</script>

<template>
  <LoginForm @login="sendLogin"></LoginForm>
</template>
