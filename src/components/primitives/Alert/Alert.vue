<template>
  <div
    class="text-wine-700 border-wine bg-wine-400 border-t-4 rounded-b px-4 py-3 shadow-md"
    role="alert">
    <div class="flex">
      <svg
        class="h-6 w-6 mr-4 fill-current text-wine-700"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <path
          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg>
      <div>
        <p class="font-bold" v-if="title">
          {{ title }}
        </p>
        <p class="text-sm" v-if="text != null">
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Alert',
    props: {
        title: {
            type: String,
            required: false,
            default: null,
        },
        text: {
            type: String,
            required: true,
        },
        alertType: {
            type: String,
            required: false,
            default: null,
        },
    },
})
</script>
