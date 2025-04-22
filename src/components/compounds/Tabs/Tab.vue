<script setup lang="ts">
import type { Tab, TabsState } from "@/types/component-types";
import { computed, onMounted, onUpdated, useTemplateRef, watch } from "vue";
import { addToStore, useStore } from "./tabs-store";

const props = withDefaults(
  defineProps<{
    label: string; // required
    disabled?: boolean;
    visible?: boolean;
  }>(),
  {
    label: "",
    visible: true,
  },
);

const content = useTemplateRef<HTMLElement>("content");
const tabs = useStore<TabsState>();
const id = JSON.parse(JSON.stringify(tabs.value.tabs)).length;
const transitionName = computed(() => {
  return tabs.value.activeTab < id ? "slide-right" : "slide-left";
});

const updateActiveHeight = () => {
  if (tabs.value.vanimated && content.value) {
    tabs.value.activeHeight = content.value.offsetHeight;
  }
};

onMounted(updateActiveHeight);
onUpdated(updateActiveHeight);

addToStore<Tab>({ ...props, id });

watch(
  () => tabs.value.tabs.findIndex((tab) => tab.id === id),
  (index) => {
    tabs.value.tabs.splice(index, 1, { id, ...props });
  },
  { immediate: true },
);

const isActiveTab = computed(() => tabs.value.activeTab === id);
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
