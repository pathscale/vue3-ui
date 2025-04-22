<script setup lang="ts">
import { useTemplateRef } from "vue";

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
  }>(),
  {
    tag: "a",
    ariaRole: "menuitem",
  },
);

const active = defineModel<boolean>("active");
const expanded = defineModel<boolean>("expanded");
const content = useTemplateRef<HTMLElement>("content");

const onClick = () => {
  // TODO Disable previous active item
  if (props.disabled) return;

  expanded.value = !expanded.value;
  active.value = true;
};
</script>

<template>
  <li class="li" :role="ariaRole" ref="content">
    <component
      :is="tag"
      v-bind="$attrs"
      :class="{
        'is-flex': icon,
        'is-active': active,
        'is-disabled': disabled
      }"
      @click="onClick">
      <span v-if="icon" class="pr-2">{{ icon }} </span>
      <span v-if="label">{{ label }}</span>
      <slot
        v-else
        name="label"
        :expanded="expanded"
        :active="active" />
    </component>
    <template v-if="$slots.default">
      <!-- <transition name="slide"> -->
      <ul class="ul" v-show="expanded">
        <slot />
      </ul>
      <!-- </transition> -->
    </template>
  </li>
</template>
