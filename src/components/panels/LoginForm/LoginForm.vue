<script>
  import { reactive, watchEffect, computed, onMounted } from 'vue';
  import Input from '../../primitives/Input/Input.vue';
  import Field from '../../primitives/Field/Field.vue';
  import Button from '../../primitives/Button/Button.vue';

  const LoginForm = {
    components: { Input, Field, Button },
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
  <form class="box">
    <Field label="Email">
      <Input name="email" v-model="state.email" status="valid" />
    </Field>
    <Field label="Password">
      <Input name="password" type="password" v-model="state.password" status="valid" />
    </Field>

    <Field>
      <Button type="is-success" @click="sendLogin" :disabled="!isValid">Login</Button>
    </Field>
  </form>
</template>
