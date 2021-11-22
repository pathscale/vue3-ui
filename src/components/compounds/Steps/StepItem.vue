<script>
import { computed, ref, watchEffect } from 'vue'
import { addToStore, useStore } from './Steps.vue'

export default {
  name: 'VStep',
  props: {
    // eslint-disable-next-line vue/no-unused-properties -- used
    title: {
      type: String,
      default: '',
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties -- used
    subtitle: String,
    // eslint-disable-next-line vue/no-unused-properties -- used
    marker: {
      type: String,
      default: '',
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties -- used
    disabled: Boolean,
    // eslint-disable-next-line vue/no-unused-properties -- used
    clickable: Boolean,
  },
  setup(props, { emit }) {
    const content = ref(null)
    const tabs = useStore()
    const id = JSON.parse(JSON.stringify(tabs.value.tabs)).length

    addToStore({ ...props, id })

    watchEffect(() => {
      const index = tabs.value.tabs.findIndex(tab => tab.id === id)
      tabs.value.tabs.splice(index, 1, { id, ...props })
    })

    const isActiveTab = computed(() => tabs.value.activeTab === id)

    return { content, isActiveTab }
  },
}
</script>

<template>
  <div v-if="isActiveTab" ref="content">
    <slot />
  </div>
</template>
