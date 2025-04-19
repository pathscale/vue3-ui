<script setup lang="ts">
// todo add docs about this component to https://vue3.dev/documentation

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    hasName?: boolean;
    fullwidth?: boolean;
    boxed?: boolean;
    size?: string;
    color?: string;
    alignment?: string;
  }>(),
  {
    color: "is-primary",
  },
);
</script>

<template>
  <div
    class="file"
    :class="[
      size,
      color,
      alignment,
      {
        'has-name': hasName,
        'is-fullwidth': fullwidth,
        'is-boxed': boxed
      }
    ]">
    <label class="file-label">
      <input class="file-input" type="file" v-bind="$attrs" />
      <span class="file-cta">
        <span class="file-label">
          <slot name="label" />
        </span>
      </span>
      <span class="file-name" v-if="hasName">
        <slot name="fileName" />
      </span>
    </label>
  </div>
</template>
