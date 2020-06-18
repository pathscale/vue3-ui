<template>
  <div class="px-2 py-2" :class="{ 
    'grid gap-4 grid-cols-12': !cols,
    'col-span-2': cols === '2',
    'col-span-3': cols === '3',
    'col-span-4': cols === '4',
    'col-span-5': cols === '5',
    'col-span-6': cols === '6',
    'col-span-7': cols === '7',
    'col-span-8': cols === '8',
    'col-span-9': cols === '9',
    'col-span-10': cols === '10',
    'col-span-11': cols === '11',
    'col-span-12': cols === '12'
  }">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    name: "Layout",
    props: {
        cols: {
            type: String,
            default: ""
        },
    }
})
</script>