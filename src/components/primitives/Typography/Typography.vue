<template>
  <component
    :is="variant"
    :class="`font-sans font-normal text-white ${variant}`">
    <slot />
  </component>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Typography',
    props: {
        variant: {
            type: String,
            require: true,
            default: 'p',
            validator(value) {
                return ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
            },
        },
    },
})
</script>

<style scoped>
.h1 {
    @apply text-6xl;
}
.h2 {
    @apply text-5xl;
}
.h3 {
    @apply text-4xl;
}
.h4 {
    @apply text-3xl;
}
.h5 {
    @apply text-2xl;
}
.h6 {
    @apply text-xl;
}
</style>
