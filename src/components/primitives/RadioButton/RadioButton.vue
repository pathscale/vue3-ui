<template>
  <div>
    <input v-bind="$attrs" type="radio" id="radio" :checked="checked" @click="checked = !checked" />
    <label v-if="title" class="px-2" for="radio">{{ title }}</label>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "RadioButton",
  props: {
    title: {
      type: String,
      default: null
    },
    modelValue: {
      type: Boolean,
      required: true
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {  
    const checked = ref(props.modelValue);
    watchEffect(() => {
        emit('update:modelValue', checked.value);
    });
    return { checked };
  }
});
</script>

<style scoped>
</style>