<template>
  <div class="mt-4">
    <label v-if="label" :for="name" class="text-white">{{ label }}</label>
    <input :name="name" v-bind="$attrs" class="transition ease-in-out duration-300 bg-transparent block w-full px-2 py-4 border-b-2 focus:outline-none focus:z-10 border-wine focus:border-wine-lighter placeholder-gray-400 relative sm:leading-5 sm:text-sm text-white mb-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Input",
    props: {
      label: {
        type: String,
        required: false,
        default: null,
      },
      name: {
        type: String,
        required: true,
      },
    },
});
</script>