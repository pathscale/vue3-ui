<template>
  <div>
    <input type="checkbox" id="checkbox" v-model="value" />
    <label for="checkbox">{{ value }}</label>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "Checkbox",
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
  },
  emits: ['update:modelValue'],
  setup(props: any, { emit }) {  
    const value = ref(props.modelValue);
    watchEffect(() => {
        emit('update:modelValue', value.value);
    });
    return { value };
  }
});
</script>

<style scoped>
</style>