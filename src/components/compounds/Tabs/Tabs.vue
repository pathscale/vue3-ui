<script>
import { provide, inject, ref, watchEffect } from 'vue'

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
        size: { type: String, default: null},
        type: {
            type: String,
            default: null
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        provideStore({ activeTab: 0, tabs: [] })
        const tabs = useStore()
        function setActiveTab(id) {
            tabs.value.activeTab = id
        }

        watchEffect(() => {
            setActiveTab(props.modelValue)
        })

        watchEffect(() => {
          emit('update:modelValue', tabs.value.activeTab)
        })

        return {
            tabs,
            setActiveTab,
        }
    },
}

export default Tabs;
</script>

<template>
  <section>
    <nav class="tabs" :class="[size, type]">
      <ul>
        <template v-for="t in tabs.tabs">
          <li
            :class="{ 'is-active': tabs.activeTab == t.id, 'is-disabled': t.disabled }"
            @click="setActiveTab(t.id)"
            :key="t">
            <a>
              {{ t.label }}
            </a>
          </li>
        </template>
      </ul>
    </nav>
    <slot />
  </section>
</template>
