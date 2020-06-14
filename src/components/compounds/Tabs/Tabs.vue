<template>
  <div class="pt-4">
    <ul class="flex border-b">
      <template v-for="t in tabs.tabs">
        <li
          class="-mb-px mr-1 w-full"
          @click="setCurrentTab(t.id)"
          :key="t">
          <a
            :class="activeClass(t.id)"
            class="transition ease-in-out duration-300 text-white py-4 px-6 block focus:outline-none uppercase hover:bg-white hover:bg-opacity-10"
            href="#">
            {{ t.title }}
          </a>
        </li>
      </template>
    </ul>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, inject, ref } from 'vue'

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
    props: {},
    setup(props) {
        provideStore({ currentTab: '1', tabs: [] })
        const tabs = useStore()
        function setCurrentTab(id) {
            tabs.value.currentTab = id
        }

        const activeClass = (id) => {
            return {
                'border-b-2 border-wine text-wine flex-justify-between hover:bg-wine-darker hover:bg-opacity-20 bg-grey-darker':
                    tabs.value.currentTab === id,
            }
        }

        return {
            tabs,
            setCurrentTab,
            activeClass,
        }
    },
})
</script>
