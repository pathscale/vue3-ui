<script>
  import { ref, watchEffect } from 'vue';

  const TextInput = {
    props: {
      name: {
        type: String,
        required: true
      },
      modelValue: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const value = ref(props.modelValue);

      watchEffect(() => {
        emit('update:modelValue', value.value);
      });

      return { value };
    }
  };

  export default TextInput;
</script>

<template>
  <label :for="name" />
  <input type="text" :name="name" :id="name" :class="{ error: status === 'error' }" v-model="value" />
</template>
