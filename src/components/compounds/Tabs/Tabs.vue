<script setup lang="ts">
import type { Tab, TabsState } from "@/types/component-types";
import { provideStore } from "@/utils/tabs-store";
import { computed, watchEffect } from "vue";

const props = defineProps<{
  modelValue: number | string; // required
  size?: "is-small" | "is-medium" | "is-large";
  type?: "is-boxed" | "is-toggle" | "is-toggle-rounded"; // todo update docs: add "is-toggle-rounded" to table
  expanded?: boolean;
  position?: "is-centered" | "is-right";
  vertical?: boolean; // TODO
  vanimated?: boolean; // todo update docs: remove true as default
  animated?: boolean; // todo update docs: remove true as default
}>();

const emit = defineEmits(["update:modelValue", "change"]);

const tabs = provideStore<TabsState>({
  activeTab: 0,
  activeHeight: null,
  tabs: [],
  animated: props.animated,
  vanimated: props.vanimated,
});

const setActiveTabID = (id: number | string) => {
  tabs.value.activeTab = id;
};

const setActiveTab = (t: Tab) => {
  if (!t.disabled) {
    setActiveTabID(t.id);
  }
};

const contentHeight = computed(() => {
  return `height:${tabs.value.activeHeight}px`;
});

watchEffect(() => {
  setActiveTabID(props.modelValue);
});

watchEffect(() => {
  emit("update:modelValue", tabs.value.activeTab);
  emit("change", tabs.value.activeTab);
});

const isHorizontal = computed(() => props.position && !props.vertical);

const rounded = computed(() => props.type === "is-toggle-rounded");

const isTabActive = (t: Tab) => tabs.value.activeTab === t.id;
</script>

<template>
  <div>
    <nav
      class="tabs"
      :class="[
        type,
        size,
        {
          [position ?? '']: isHorizontal,
          'is-fullwidth': expanded,
          'is-toggle-rounded is-toggle': rounded,
        },
      ]">
      <ul class="ul">
        <template v-for="t in tabs.tabs" :key="t">
          <li class="li" :class="{ 'is-active': isTabActive(t) }" @click="setActiveTab(t)">
            <a :class="{ 'is-disabled': t.disabled }">
              {{ t.label }}
            </a>
          </li>
        </template>
      </ul>
    </nav>
    <div :class="{ 'is-height-animated': vanimated }" :style="contentHeight">
      <slot />
    </div>
  </div>
</template>
