<script setup lang="ts">
import { computed, useAttrs } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    size?: string;
    label?: string;
    rounded?: boolean;
    loading?: boolean;
    outlined?: boolean;
    expanded?: boolean;
    inverted?: boolean;
    focused?: boolean;
    active?: boolean;
    hovered?: boolean;
    selected?: boolean;
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type
    nativeType?: "button" | "submit" | "reset";
    tag?: string;
    light?: boolean;
  }>(),
  {
    type: "is-primary",
    nativeType: "button",
    tag: "button",
  },
);

const attrs = useAttrs();

const computedTag = computed(() => (attrs.disabled ? "button" : props.tag));
</script>

<template>
  <component
    :is="computedTag"
    class="button"
    :type="nativeType"
    :class="[
      size,
      type,
      {
        'is-rounded': rounded,
        'is-loading': loading,
        'is-outlined': outlined,
        'is-fullwidth': expanded,
        'is-inverted': inverted,
        'is-focused': focused,
        'is-active': active,
        'is-hovered': hovered,
        'is-selected': selected,
        'is-light': light,
      },
    ]">
    <span v-if="label">{{ label }}</span>
    <slot />
  </component>
</template>
