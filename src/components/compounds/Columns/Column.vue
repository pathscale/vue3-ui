<script setup lang="ts">
defineProps<{
  size?:
    | "is-1"
    | "is-2"
    | "is-3"
    | "is-4"
    | "is-5"
    | "is-6"
    | "is-7"
    | "is-8"
    | "is-9"
    | "is-10"
    | "is-11"
    | "is-12"
    | "is-three-quarters"
    | "is-two-thirds"
    | "is-half"
    | "is-one-third"
    | "is-one-quarter"
    | "is-full"
    | "is-four-fifths"
    | "is-three-fifths"
    | "is-two-fifths"
    | "is-one-fifth";
  offset?: string;
  narrow?: boolean;
  narrowBreakpoint?: string;
}>();
</script>

<template>
  <div class="column" :class="[
    size,
    offset,
    narrowBreakpoint,
    {
      'is-narrow': narrow
    }
  ]">
    <slot />
  </div>
</template>
