<template>
  <div class="pt-4">
    <ul class="flex border-b">
      <template v-for="t in tabs.tabs">
        <li
          class="-mb-px mr-1 w-full"
          @click="setActiveTab(t.id)"
          :key="t">
          <a
            :class="{ 'is-active': tabs.activeTab == t.id, 'is-disabled': t.disabled }"
            class="transition ease-in-out duration-300 py-4 px-6 block focus:outline-none uppercase hover:bg-opacity-10"
            href="#">
            {{ t.label }}
          </a>
        </li>
      </template>
    </ul>
    <slot />
  </div>
</template>

<script>
import { defineComponent, provide, inject, ref, watchEffect } from 'vue'

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
    // @ts-ignore
    return store
}

export function addToStore(tab) {
    const tabs = useStore()
    tabs.value.tabs.push(tab)
}

export default defineComponent({
    name: 'Tabs',
    props: {
       modelValue: {
            type: [Number, String],
            required: true,
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
})
</script>
