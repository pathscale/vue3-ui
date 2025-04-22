<script setup lang="ts">
import type { PaginationPage } from "@/types/component-types";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    page: PaginationPage; // required
    tag?: string;
    disabled?: boolean;
  }>(),
  {
    tag: "a",
  },
);

const href = computed(() => {
  return props.tag === "a" ? "#" : undefined;
});

const effectiveDisabled = computed(() => {
  return props.disabled || props.page.disabled ? true : undefined;
});
</script>

<template>
  <component
    :is="tag"
    role="button"
    :href="href"
    :disabled="effectiveDisabled"
    class="pagination-link"
    :class="{ 'is-current': page.isCurrent, [page.class]: true }"
    v-bind="$attrs"
    @click.prevent="page.click"
    :aria-label="page['aria-label']"
    :aria-current="page.isCurrent">
    <slot>{{ page.number }}</slot>
  </component>
</template>
