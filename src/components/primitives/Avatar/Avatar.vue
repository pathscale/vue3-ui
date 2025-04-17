<template>
  <figure
    class="image is-flex is-justify-content-center is-align-items-center mx-1"
    :class="[size, backgroundColor, textColor]">
    <img
      :src="source"
      :data-src="dataSrc"
      :alt="alt"
      v-if="source"
      :class="[customClass, { 'is-rounded': rounded }]" />
    <span class="is-size-4" v-if="!source" :class="[{ 'is-rounded': rounded }]">
      {{ caption }}
    </span>
  </figure>
</template>

<script setup lang="ts">
/* eslint-disable no-undef -- Access to Benchie variable/function */
// import { onBeforeMount, ref } from 'vue'

withDefaults(defineProps<{
  alt?: string
  size?: string
  rounded?: boolean
}>(), {
  size: 'is-64x64',
  rounded: true,
})

// export default {
//   props: {
//     background: {
//       type: String,
//       default: 'has-background-link',
//     },
//     text: {
//       type: String,
//       default: 'has-text-white',
//     },
//     src: {
//       type: String,
//       default: null,
//     },
//     dataSrc: {
//       type: String,
//       default: null,
//     },
//     customClass: String,
//   },
//   setup(props) {
//     const source = ref(props.src || props.dataSrc)
//     const background = ref(props.background)
//     const text = ref(props.text)
//     const alt = ref(props.alt)
//
//     // todo fix: same as image.vue
//     const hasBenchieSupport = false
//
//     onBeforeMount(async () => {
//       if (props.dataSrc && hasBenchieSupport) {
//         source.value = await t(props.dataSrc, $__CDN)
//       }
//     })
//
//     const backgroundColor = source.value ? '' : background.value
//
//     const textColor = source.value ? '' : text.value
//
//     const caption = alt.value ? alt.value.split(' ')[0][0] + alt.value.split(' ')[1][0] : ""
//
//     return { source, backgroundColor, textColor, caption }
//   },
// }
</script>
