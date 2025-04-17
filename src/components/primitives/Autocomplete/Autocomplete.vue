<template>
  <!-- eslint-disable @pathscale/vue3/v-directive -->
  <div>
    <div class="dropdown" :class="{ 'is-active': state.isOpen }">
      <div class="dropdown-trigger">
        <v-field :label="label">
          <v-input
            @focus="handleClickInside"
            type="text"
            @input="onChange"
            v-model="state.search"
            @keyup.down="onArrowDown"
            @keyup.up="onArrowUp"
            @keyup.enter="onEnter" />
        </v-field>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div v-if="state.results.length === 0" class="dropdown-item">
            No data available
          </div>
          <a
            v-for="(result, i) in state.results"
            :key="i"
            @click="setResult(result)"
            class="dropdown-item"
            :class="{ 'is-active': i === state.arrowCounter }">
            {{ result }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel, reactive, watchEffect } from 'vue'
import VField from '@/components/Field/Field.vue'
import VInput from '@/components/Input/Input.vue'

const modelValue = defineModel<string | number>()

withDefaults(defineProps<{
  items?: any[]
}>(), {
  items: () => [],
})

// export default {
//   props: {
//     label: String,
//   },
//   emits: ['update:modelValue'],
//   setup(props, { emit }) {
//     const state = reactive({
//       value: props.modelValue,
//       isOpen: false,
//       results: props.items,
//       search: '',
//       arrowCounter: 0,
//     })
//
//     const filterResults = () => {
//       // first uncapitalize all the things
//       state.results = props.items.filter(item => {
//         return item.toLowerCase().includes(state.search.toLowerCase())
//       })
//     }
//
//     watchEffect(() => {
//       state.search = props.modelValue
//     })
//
//     const onChange = () => {
//       filterResults()
//       state.isOpen = true
//     }
//
//     const setResult = result => {
//       emit('update:modelValue', result)
//       state.search = result
//       state.isOpen = false
//     }
//
//     const onArrowDown = evt => {
//       if (state.arrowCounter < state.results.length) {
//         state.arrowCounter += 1
//       }
//     }
//
//     const onArrowUp = () => {
//       if (state.arrowCounter > 0) {
//         state.arrowCounter -= 1
//       }
//     }
//
//     const onEnter = () => {
//       state.search = state.results[state.arrowCounter]
//       state.isOpen = false
//       state.arrowCounter = -1
//     }
//
//     const handleClickInside = evt => {
//       state.isOpen = true
//     }
//
//     // TODO: handle click outside
//     const handleClickOutside = evt => {
//       state.isOpen = false
//       state.arrowCounter = -1
//     }
//
//     return {
//       onChange,
//       state,
//       onArrowDown,
//       onArrowUp,
//       onEnter,
//       setResult,
//       // handleClickOutside,
//       handleClickInside,
//     }
//   },
// }
</script>
