<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { addToStore, useStore } from "./Steps.vue";

defineProps<{
  title?: string;
  subtitle?: string;
  marker?: string;
  disabled?: boolean;
  clickable?: boolean;
}>();

const content = ref(null);
const tabs = useStore();
const id = JSON.parse(JSON.stringify(tabs.value.tabs)).length;

addToStore({ ...props, id });

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
  <div v-if="isActiveTab" ref="content">
    <slot />
  </div>
</template>
