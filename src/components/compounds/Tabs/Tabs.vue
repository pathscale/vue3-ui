<script>
import { provide, inject, ref, watchEffect, computed, onUpdated, nextTick } from 'vue'

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
        type: { type: String,  default: null },
        expanded: Boolean,
        position: String,
        vertical: Boolean,
        vanimated: Boolean,
        animated: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const height = ref(null);

      const content = ref(null)


      provideStore({ activeTab: 0, tabs: [], animated: props.animated })
      const tabs = useStore()
      function setActiveTab(id) {
          tabs.value.activeTab = id
      }

      onUpdated(() => {
        nextTick(() => {
          height.value = content.value.children[0].clientHeight
        })
      })

      const contentHeight = computed(() => {
        return `height:${height.value}px`
      })
      watchEffect(() => {
          setActiveTab(props.modelValue)
      })

      watchEffect(() => {
        emit('update:modelValue', tabs.value.activeTab)
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

      return {
          contentHeight,
          navClasses,
          setActiveTab,
          tabs,
          content
      }
    },
}

export default Tabs;
</script>

<template>
  <section>
    <nav class="tabs" :class="navClasses">
      <ul>
        <template v-for="t in tabs.tabs">
          <li
            :class="{ 'is-active': tabs.activeTab == t.id, 'is-disabled': t.disabled }"
            @click="setActiveTab(t.id);"
            :key="t">
            <a>
              {{ t.label }}
            </a>
          </li>
        </template>
      </ul>
    </nav>
    <div ref="content" :class="{'is-height-animated': vanimated}" :style="contentHeight">
      <slot />
    </div>
  </section>
</template>
