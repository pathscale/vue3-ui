<template>
  <div class="mt-4">
    <progress :value="value" v-bind="$attrs" max="100">
      {{ value }}%
    </progress>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ProgressIndicator',
    props: {
        label: {
            type: String,
            required: false,
            default: null,
        },
        value: {
            type: String,
            required: true,
        },
    },
})
</script>
