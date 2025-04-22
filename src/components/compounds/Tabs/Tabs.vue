<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { provideStore } from "./store1";

const props = defineProps<{
  modelValue: number | string; // required
  size?: "is-small" | "is-medium" | "is-large";
  type?: "is-boxed" | "is-toggle" | "is-toggle-rounded"; // todo update docs: add "is-toggle-rounded" to table
  expanded?: boolean;
  position?: "is-centered" | "is-right";
  vertical?: boolean; // TODO
  vanimated?: boolean;
  animated?: boolean;
}>();

const emit = defineEmits(["update:modelValue", "change"]);

const tabs = provideStore({
  activeTab: 0,
  activeHeight: null,
  tabs: [],
  animated: props.animated,
  vanimated: props.vanimated,
});

const setActiveTabID = (id: number) => {
  tabs.value.activeTab = id;
};

const setActiveTab = (t) => {
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

const isTabActive = (t) => tabs.value.activeTab === t.id;
</script>

<template>
  <div>
    <nav
      class="tabs"
      :class="[
        type,
        size,
        {
          [position]: isHorizontal,
          'is-fullwidth': expanded,
          'is-toggle-rounded is-toggle': rounded,
        },
      ]">
      <ul class="ul">
        <template v-for="t in tabs.tabs" :key="t">
          <li
            class="li"
            :class="{
              'is-active': isTabActive(t),
            }"
            @click="setActiveTab(t)">
            <a
              :class="{
                'is-disabled': t.disabled,
              }">
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
