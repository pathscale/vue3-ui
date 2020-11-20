<script>
/* eslint-disable no-undef -- Access to Benchie variable/function */
import { onBeforeMount, ref } from 'vue'

export default {
    name: 'VAvatar',
    props: {
     src: {
      type: String,
     },
     dataSrc: {
      type: String,
     },
    },
    setup(props){
        const source = ref(props.src || props.dataSrc)
        onBeforeMount(async() => {
            const isProduction = process.env.NODE_ENV === 'production'
            if (isProduction) {
                const hasBenchieSupport = t && typeof t === 'function' && $__CDN && typeof $__CDN === 'string'
                if (hasBenchieSupport && props.dataSrc) {
                source.value = await t(props.dataSrc, $__CDN)
                }
            }
        })

        return { source }
    }
}
</script>

<template>
  <div class="avatar">
    {{ source }}
  </div>
</template>