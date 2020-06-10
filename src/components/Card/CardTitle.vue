<template>
  <div class="px-6 mt-4">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardTitle",
});
</script>
