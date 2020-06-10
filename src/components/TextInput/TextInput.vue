<script>
  import { ref, watchEffect } from 'vue';

  export default {
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
</script>

<template>
  <label :for="name"></label>
  <input type="text" :name="name" :id="name" :class="{ error: status === 'error' }" v-model="value" />
</template>
