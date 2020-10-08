<script>
import { computed, ref, watchEffect } from 'vue'
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
    const content = ref(null);

    const tabs = useStore()
    const id = JSON.parse(JSON.stringify(tabs.value.tabs)).length // TODO Figure how get this value properly
    const transitionName = computed(() => {
      return tabs.value.activeTab < id ? 'slide-right' : 'slide-left'
    })

    watchEffect(() => {
      if (content.value) {
        tabs.value.activeHeight = content.value.offsetHeight
      }
    })

    addToStore({ ...props, id })

    const isActiveTab = computed(() => {
      return tabs.activeTab === id
    })
    return { tabs, id, transitionName, content, isActiveTab}
  },
}

export default Tab;
</script>

<template>
  <transition v-if="tabs.animated" :name="transitionName">
    <div v-if="isActiveTab" ref="content">
      <slot />
    </div>
  </transition>
  <div v-else-if="isActiveTab" ref="content">
    <slot />
  </div>
</template>
