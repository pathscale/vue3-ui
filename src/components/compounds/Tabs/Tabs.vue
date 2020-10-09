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

const Tabs = {
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
    provideStore({ activeTab: 0, activeHeight: null, tabs: [], animated: props.animated })
    const tabs = useStore()
    function setActiveTabID(id) {
      tabs.value.activeTab = id
    }
    function setActiveTab(t) {
      if(!t.disabled) {
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

    const navClasses = computed(() => {
      return [
        props.type,
        props.size,
        {
          [props.position]: props.position && !props.vertical,
          'is-fullwidth': props.expanded,
          'is-toggle-rounded is-toggle': props.type === 'is-toggle-rounded'
        }
      ]
    })
    const tabClasses = (t) => {
      return {
        'is-active': tabs.value.activeTab === t.id
      }
    }
    const labelClasses = (t) => {
      return {
        'is-disabled': t.disabled
      }
    }
    const animatedClasses = computed(() => {
      return [
        {
          'is-height-animated': props.vanimated
        }
      ]
    })
    return {
      contentHeight,
      navClasses,
      setActiveTab,
      tabs,
      tabClasses,
      labelClasses,
      animatedClasses
    }
  },
}

export default Tabs;
</script>

<template>
  <section>
    <nav class="tabs" :class="navClasses">
      <ul>
        <template v-for="t in tabs.tabs" :key="t">
          <li
            :class="tabClasses(t)"
            @click="setActiveTab(t)">
            <a :class="labelClasses(t)">
              {{ t.label }}
            </a>
          </li>
        </template>
      </ul>
    </nav>
    <div :class="animatedClasses" :style="contentHeight">
      <slot />
    </div>
  </section>
</template>
