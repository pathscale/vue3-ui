<template>
  <div class="pt-4 px-2" v-if="tabs.currentTab == id">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Might avoid this in the future with https://github.com/ktsn/vuetype/issues/31
// @ts-ignore
import { addToStore, useStore } from './Tabs.vue'

export default defineComponent({
    name: 'Tab',
    props: {
        id: {
            type: String,
            default: '0',
            required: true,
        },
        title: {
            type: String,
            default: '',
            required: true,
        },
    },
    setup(props: any, { emit }) {
        const tabs = useStore()
        addToStore({ ...props })
        return { tabs }
    },
})
</script>
