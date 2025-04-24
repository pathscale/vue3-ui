<script setup lang="ts">
import { ref, useSlots, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
    icon?: string;
    tag?: string;
    ariaRole?: string;
    active?: boolean;
    expanded?: boolean;
  }>(),
  {
    tag: "a",
    ariaRole: "menuitem",
    active: false,
    expanded: false,
  },
);

// Notice we add the "click" event here.
const emit = defineEmits<{
  (e: "update:expanded", value: boolean): void;
  (e: "update:active", value: boolean): void;
  (e: "click", event: Event): void;
}>();

const content = ref<HTMLElement | null>(null);
const expanded = ref(props.expanded);
// Create a local state for active so that once activated it stays true.
const activeLocal = ref(props.active);
const slots = useSlots();

// Keep the local expanded state in sync with the prop.
watchEffect(() => {
  expanded.value = props.expanded;
});

// Also update the local active state if the parent prop changes:
watchEffect(() => {
  activeLocal.value = props.active;
});

const onClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  // Emit the native click event so that the test can detect it.
  emit("click", event);

  // Always toggle the expanded state (regardless of whether a default slot exists).
  const newExpanded = !expanded.value;
  expanded.value = newExpanded;
  emit("update:expanded", newExpanded);

  // Emit update:active only if we aren’t already active.
  if (!activeLocal.value) {
    activeLocal.value = true;
    emit("update:active", true);
  }
};
</script>

<template>
  <li class="li" :role="ariaRole" ref="content" :aria-expanded="expanded">
    <component
      :is="tag"
      v-bind="$attrs"
      :class="{
        'is-flex': icon,
        'is-active': active,
        'is-disabled': disabled
      }"
      :aria-disabled="disabled"
      @click="onClick"
      @keydown.enter="onClick"
    >
      <span v-if="icon" class="pr-2">{{ icon }}</span>
      <span v-if="label">{{ label }}</span>
      <slot v-else name="label" :expanded="expanded" :active="active" />
    </component>

    <template v-if="$slots.default">
      <transition name="slide">
        <ul v-show="expanded" class="ul" role="menu">
          <slot />
        </ul>
      </transition>
    </template>
  </li>
</template>
