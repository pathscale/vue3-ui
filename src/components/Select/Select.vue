<template>
  <select
    v-bind="$attrs"
    class="w-32 top-2 appearance-none bg-transparent text-white bg-grey block focus:outline-none pr-8 px-4 py-2 rounded">
    <slot />
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Select",
});
</script>
