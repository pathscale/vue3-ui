<template>
  <div v-if="tabs.activeTab == id">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { addToStore, useStore } from './Tabs.vue'

export default defineComponent({
    name: 'Tab',
    props: {
        id: {
            type: String,
            default:'0' ,
            required: true,
        },
        label: {
            type: String,
            default: '',
            required: true,
        },
        disabled: Boolean,
        visible: {
            type: Boolean,
            default: true
        },
    },
    setup(props, { emit }) {
        const tabs = useStore()
        addToStore({ ...props })
        return { tabs }
    },
})
</script>
