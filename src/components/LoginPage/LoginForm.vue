<script>
  import { reactive, watchEffect, computed, onMounted } from 'vue';
  import TextInput from '../TextInput/TextInput.vue';

  export default {
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

        console.log('state', state.email, state.password);
        console.log('status', status.email, status.password);
      });

      return { state, status, sendLogin, isValid };
    }
  };
</script>

<template>
  <form>
    <TextInput name="email" v-model="state.email" status="valid" />
    <TextInput name="password" v-model="state.password" status="valid" />
    <button type="button" @click="sendLogin" :disabled="!isValid">Login</button>
  </form>
</template>
