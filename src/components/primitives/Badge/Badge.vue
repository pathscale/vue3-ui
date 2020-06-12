<template>
  <div class="notification">
    <slot />
    <span class="badge">{{ content }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Badge',
    props: {
        content: {
            type: String,
            required: true,
        },
    },
})
</script>

<style scoped>
.notification {
  color: white;
  text-decoration: none;
  padding: 15px 26px;
  position: relative;
  display: inline-block;
  border-radius: 2px;
}

.notification .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background-color: red;
  color: white;
}
</style>
