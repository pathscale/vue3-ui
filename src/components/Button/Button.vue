<template>
  <button v-bind="$attrs" class="bg-wine hover:bg-wine-500 text-white py-2 px-6 uppercase transition ease-in-out duration-300 rounded shadow-sm">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button"
});
</script>
