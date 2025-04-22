<script setup lang="ts">
import { computed } from "vue";

type IPaginationPage = {
  number: number;
  isCurrent: boolean;
  disabled: boolean;
  class: string;
};

const props = withDefaults(
  defineProps<{
    page: IPaginationPage; // required
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

const computedDisabled = computed(() => {
  return props.disabled || props.page.disabled ? true : undefined;
});
</script>

<template>
  <component
    :is="tag"
    role="button"
    :href="href"
    :disabled="computedDisabled"
    class="pagination-link"
    :class="{ 'is-current': page.isCurrent, [page.class]: true }"
    v-bind="$attrs"
    @click.prevent="page.click"
    :aria-label="page['aria-label']"
    :aria-current="page.isCurrent">
    <slot>{{ page.number }}</slot>
  </component>
</template>