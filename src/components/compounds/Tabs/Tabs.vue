<script>
import { provide, inject, ref, watchEffect, computed } from 'vue'

const TabsSymbol = Symbol('Tabs')

export function provideStore(store) {
  const storeRef = ref(store)
  provide(TabsSymbol, storeRef)
}

export function useStore() {
  const store = inject(TabsSymbol)
  if (!store) {
    // throw error, no store provided
  }
  return store
}

export function addToStore(tab) {
  const tabs = useStore()
  tabs.value.tabs.push(tab)
}

export default {
  name: 'VTabs',
  props: {
    modelValue: {
      type: [Number, String],
      required: true,
    },
    size: String,
    type: String,
    expanded: Boolean,
    position: String,
    vertical: Boolean, // TODO
    vanimated: Boolean,
    animated: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    provideStore({
      activeTab: 0,
      activeHeight: null,
      tabs: [],
      animated: props.animated,
      vanimated: props.vanimated
    })
    const tabs = useStore()

    const setActiveTabID = id => {
      tabs.value.activeTab = id
    }

    const setActiveTab = t => {
      if (!t.disabled) {
        setActiveTabID(t.id)
      }
    }

    const contentHeight = computed(() => {
      return `height:${tabs.value.activeHeight}px`
    })

    watchEffect(() => {
      setActiveTabID(props.modelValue)
    })

    watchEffect(() => {
      emit('update:modelValue', tabs.value.activeTab)
      emit('change', tabs.value.activeTab)
    })

    const isHorizontal = computed(() => props.position && !props.vertical)

    const rounded = computed(() => props.type === 'is-toggle-rounded')

    const isTabActive = t => tabs.value.activeTab === t.id

    return {
      contentHeight,
      setActiveTab,
      tabs,
      isHorizontal,
      rounded,
      isTabActive
    }
  },
}
</script>

<template>
  <section>
    <nav class="tabs" :class="[
      type,
      size,
      {
        [position]: isHorizontal,
        'is-fullwidth': expanded,
        'is-toggle-rounded is-toggle': rounded
      }
    ]">
      <ul>
        <template v-for="t in tabs.tabs" :key="t">
          <li
            :class="{
              'is-active': isTabActive(t)
            }"
            @click="setActiveTab(t)">
            <a :class="{
              'is-disabled': t.disabled
            }">
              {{ t.label }}
            </a>
          </li>
        </template>
      </ul>
    </nav>
    <div :class="{ 'is-height-animated': vanimated }" :style="contentHeight">
      <slot />
    </div>
  </section>
</template>
