<script>
  import { reactive, watchEffect, computed, onMounted } from 'vue';
  import Input from '../../primitives/Input/Input.vue';
  import Field from '../../primitives/Field/Field.vue';
  import Button from '../../primitives/Button/Button.vue';
  import Switch from '../../primitives/Switch/Switch.vue';

  const LoginForm = {
    components: { Input, Field, Button, Switch },
    emits: ['login'],
    setup(props, { emit }) {
      const state = reactive({ email: 'asd', password: 'edc', remember: false });
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
      <Button type="is-success" @click="sendLogin" :disabled="!isValid">
        Login
      </Button>
    </Field>

    <Field>
      <Switch type="is-primary" passive-type="is-warning" v-model="state.remember">
        Remember me
      </Switch>
    </Field>
  </form>
</template>
