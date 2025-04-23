<script setup lang="ts">
import { ref, watchEffect } from "vue";

defineOptions({
  inheritAttrs: false,
});

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

const emit = defineEmits<{
  (e: "update:expanded", value: boolean): void;
  (e: "update:active", value: boolean): void;
}>();

const active = ref(props.active);
const expanded = ref(props.expanded);
const content = ref<HTMLElement | null>(null);

// Sync with props
watchEffect(() => {
  active.value = props.active;
  expanded.value = props.expanded;
});

const onClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  // Toggle expansion state
  const newExpanded = !expanded.value;
  expanded.value = newExpanded;

  // Emit changes to parent
  emit("update:expanded", newExpanded);
};
</script>

<template>
  <li class="li" :role="ariaRole" ref="content" :aria-expanded="expanded">
    <component :is="tag" v-bind="$attrs" :class="{
      'is-flex': icon,
      'is-active': active,
      'is-disabled': disabled
    }" :aria-disabled="disabled" @click="onClick" @keydown.enter="onClick">
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
