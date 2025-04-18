<script>
import { inject, provide, ref, watchEffect } from "vue";

const TabsSymbol = Symbol("Tabs");

export function provideStore(store) {
  const storeRef = ref(store);
  provide(TabsSymbol, storeRef);
  return storeRef;
}

export function useStore() {
  const store = inject(TabsSymbol);
  if (!store) {
    // throw error, no store provided
  }
  return store;
}

export function addToStore(tab) {
  const tabs = useStore();
  tabs.value.tabs.push(tab);
}

export default {
  name: "VSteps",
  props: {
    modelValue: {
      type: [Number, String],
      required: true,
    },
    size: String,
    type: String,
    animated: Boolean,
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const tabs = provideStore({
      activeTab: 0,
      activeHeight: null,
      tabs: [],
    });

    const setActiveTabID = (id) => {
      tabs.value.activeTab = id;
    };

    const setActiveTab = (t) => {
      if (!t.disabled && t.clickable) {
        setActiveTabID(t.id);
      }
    };

    watchEffect(() => {
      setActiveTabID(props.modelValue);
    });

    watchEffect(() => {
      emit("update:modelValue", tabs.value.activeTab);
      emit("change", tabs.value.activeTab);
    });

    const isTabActive = (t) => tabs.value.activeTab === t.id;
    const isTabCompleted = (t) => tabs.value.activeTab > t.id;

    return {
      setActiveTab,
      tabs,
      isTabActive,
      isTabCompleted,
    };
  },
};
</script>

<template>
  <div>
    <div
      class="steps"
      :class="[
        type,
        size,
        {
          'is-animated': animated,
        },
      ]">
      <div
        v-for="t in tabs.tabs"
        :key="t"
        class="step-item"
        :class="{
          'is-active': isTabActive(t),
          'is-completed': isTabCompleted(t),
        }"
        @click="setActiveTab(t)">
        <div
          class="step-marker"
          :class="{
            'is-disabled': t.disabled,
            'is-clickable': t.clickable,
          }">
          {{ t.marker }}
        </div>
        <div class="step-details">
          <p v-if="t.title" class="step-title">
            {{ t.title }}
          </p>
          <p v-if="t.subtitle">
            {{ t.subtitle }}
          </p>
        </div>
      </div>
    </div>
    <div class="step-content">
      <slot />
    </div>
  </div>
</template>
