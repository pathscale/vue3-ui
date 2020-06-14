<template>
  <div class="p-5">
    <div class="flex flex-wrap justify-center">
      <div class="mr-4 flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-gray-700 bg-gray-100 border border-gray-300 ">
        <div class="text-xs font-normal leading-none max-w-full flex-initial">
          Chip
        </div>
      </div>
      <div class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
        <div class="text-xs font-normal leading-none max-w-full flex-initial">
          Another chip
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Chips",
  setup(props, context) {    
    return { name: "Chips" };
  }
});
</script>

<style scoped>
</style>