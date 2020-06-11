<script>
  import LoginForm from '../../panels/LoginForm/LoginForm.vue';
  import { useState } from '../../../state';

  export default  {
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
</script>

<template>
  <LoginForm @login="sendLogin" />
</template>
