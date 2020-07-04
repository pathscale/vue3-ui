<script>
import { computed } from 'vue'
import { addToStore, useStore } from './Tabs.vue'


const Tab = {
    name: 'VTab',
    props: {
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
        const id = JSON.parse(JSON.stringify(tabs.value.tabs)).length // TODO Figure how get this value properly
        const transitionName = computed(() => {
          return tabs.value.activeTab < id ? 'slide-right' : 'slide-left'
        })
        addToStore({ ...props, id })
        return { tabs, id, transitionName }
    },
}

export default Tab;
</script>

<template>
  <transition v-if="tabs.animated" :name="transitionName">
    <div v-if="tabs.activeTab == id">
      <slot />
    </div>
  </transition>
  <div v-else-if="tabs.activeTab == id">
    <slot />
  </div>
</template>
