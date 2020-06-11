<template>
  <div class="flex">
    <label for="toggle" class="text-xs text-gray-700">Switch</label>
    <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input type="checkbox" name="toggle" id="toggle" v-model="value" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from "vue";

export default defineComponent({
  name: "Switch",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = ref(props.modelValue);
    watchEffect(() => {
      emit("update:modelValue", value.value)
    })
    return { value };
  }
});
</script>

<style scoped>

</style>