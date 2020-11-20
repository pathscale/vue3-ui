<script>
/* eslint-disable no-undef -- Access to Benchie variable/function */
import { onBeforeMount, ref } from 'vue'

export default {
    name: 'VAvatar',
    props: {
     alt: String ,
     size: {
       type: String,
       default: "is-64x64"
     },
     rounded: {
       type: Boolean,
       default: true
     },
     background: {
       type: String,
       default: 'link'
     },
     text: {
       type: String,
       default: 'white'
     },
     src: {
       type: String,
       default: null
     },
     dataSrc: {
       type: String,
       default: null
     },
     customClass: String
    },
    setup(props){
        const source = ref(props.src || props.dataSrc)
        const alt = ref(props.alt)

        onBeforeMount(async() => {
            const isProduction = process.env.NODE_ENV === 'production'
            if (isProduction) {
                const hasBenchieSupport = t && typeof t === 'function' && $__CDN && typeof $__CDN === 'string'
                if (hasBenchieSupport && props.dataSrc) {
                source.value = await t(props.dataSrc, $__CDN)
                }
            }
        })

        const backgroundColor = source.value ? `has-background-${props.background}` : ''

        const textColor = source.value ? `has-text-${props.text}` : ''

        const caption = alt.value.split(" ")[0][0] + alt.value.split(" ")[1][0]

        return { source, backgroundColor, textColor, caption }
    }
}
</script>

<template>
  <figure class="image is-flex is-justify-content-center is-align-items-center mx-1" :class="[size, backgroundColor, textColor]">
    <img :src="source" :alt="alt" v-if="source" :class="[customClass, {'is-rounded': rounded }]" />
    <span class="is-size-4" v-if="!source" :class="[{'is-rounded': rounded }]">
      {{ caption }}
    </span>
  </figure>
</template>