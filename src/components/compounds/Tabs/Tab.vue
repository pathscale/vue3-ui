<script>
import { computed, onMounted, onUpdated, ref, watchEffect } from 'vue'
import { addToStore, useStore } from './Tabs.vue'

export default {
  name: 'VTab',
  props: {
    // eslint-disable-next-line vue/no-unused-properties -- used
    label: {
      type: String,
      default: '',
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties -- used
    disabled: Boolean,
    // eslint-disable-next-line vue/no-unused-properties -- used
    visible: {
      type: Boolean,
      default: true
    },
  },
  setup(props, { emit }) {
    const content = ref(null)
    const tabs = useStore()
    const id = JSON.parse(JSON.stringify(tabs.value.tabs)).length
    const transitionName = computed(() => {
      return tabs.value.activeTab < id ? 'slide-right' : 'slide-left'
    })

    const updateActiveHeight = () => {
      if (tabs.value.vanimated && content.value) {
        tabs.value.activeHeight = content.value.offsetHeight;
      }
    }

    onMounted(updateActiveHeight);
    onUpdated(updateActiveHeight);

    addToStore({ ...props, id })

    watchEffect(() => {
      const index = tabs.value.tabs.findIndex(tab => tab.id === id)
      tabs.value.tabs.splice(index, 1, { id, ...props })
    })

    const isActiveTab = computed(() => tabs.value.activeTab === id)

    return { tabs, transitionName, content, isActiveTab }
  },
}
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
