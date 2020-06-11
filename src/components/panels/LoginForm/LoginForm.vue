<script>
  import { reactive, watchEffect, computed, onMounted } from 'vue';
  import TextInput from '../../primitives/TextInput/TextInput.vue';

  const LoginForm = {
    components: { TextInput },
    emits: ['login'],
    setup(props, { emit }) {
      const state = reactive({ email: 'asd', password: 'edc' });
      const status = reactive({ email: 'valid', password: 'valid' });

      const isValid = computed(() => status.email === 'valid' && status.password === 'valid');

      onMounted(() => {
        emit('whatever');
      });

      const sendLogin = () => {
        if (isValid.value) {
          emit('login', state);
        }
      };

      watchEffect(() => {
        status.email = state.email.length > 2 ? 'valid' : 'error';
        status.password = state.password.length > 2 ? 'valid' : 'error';
      });

      return { state, status, sendLogin, isValid };
    }
  };

  export default LoginForm;
</script>

<template>
  <form>
    <TextInput name="email" v-model="state.email" status="valid" />
    <TextInput name="password" v-model="state.password" status="valid" />
    <button type="button" @click="sendLogin" :disabled="!isValid">
      Login
    </button>
  </form>
</template>
