<template>
  <div>
    <h1>todo: I'll be a modal</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  setup(props: any, context: any) {    
    return { name: "Modal" };
  }
});
</script>

<style scoped>
</style>