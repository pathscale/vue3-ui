<script setup lang="ts">
import { watchEffect } from "vue";

const props = defineProps<{
  modelValue: number | string; // required
  size?: string; // todo union
  type?: string; // todo union
  animated?: boolean;
}>();

const emit = defineEmits(["update:modelValue", "change"]);

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
