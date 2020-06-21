<script>
import { addToStore, useStore } from './Tabs.vue'

const Tab = {
    name: 'VTab',
    props: {
        id: {
            type: [Number, String],
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
}

export default Tab;
</script>

<template>
  <div v-if="tabs.activeTab == id">
    <slot />
  </div>
</template>
