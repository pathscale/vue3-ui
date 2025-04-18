

<script>
import { computed } from "vue";

export default {
  name: "VPaginationItem",
  props: {
    page: {
      type: Object,
      required: true,
    },
    tag: {
      type: String,
      default: "a",
    },
    disabled: Boolean,
  },

  setup(props) {
    const href = computed(() => {
      return props.tag === "a" ? "#" : null;
    });

    const computedDisabled = computed(() => {
      return props.disabled || props.page.disabled ? true : null;
    });

    return {
      href,
      computedDisabled,
    };
  },
};
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