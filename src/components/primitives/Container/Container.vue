<template>
  <div
    class="container"
    :class="[type]"
    :style="[ bg ? {
      'background-image': `url(${bg})`,
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
    } : {}]">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VContainer',
    props: {
        type: {
            type: String,
            default: '',
            validator(value) {
                return ['is-fluid', 'is-widescreen', 'is-fullhd'].includes(value);
            }
        },
        bg: {
            type: Object,
            default: null,
        }
    }
})
</script>