<script setup lang="ts">
defineProps<{
  mobile?: boolean;
  desktop?: boolean;
  gapless?: boolean;
  /**
   * Defines the column gap between items.
   *
   * You can specify a custom gap size using the following modifiers:
   *   is-0, is-1, is-2, is-3, is-4, is-5, is-6, is-7, is-8
   *
   * You can also define responsive gaps for specific breakpoints
   * by appending the breakpoint name to the modifier.
   *
   * Example usage:
   * ```vue
   * <v-columns
   *   gap="is-2-mobile is-0-tablet is-3-desktop is-8-widescreen is-1-fullhd"
   * >
   *   ...
   * </v-columns>
   * ```
   *
   * Breakpoints:
   * - mobile
   * - tablet
   * - desktop
   * - widescreen
   * - fullhd
   *
   * Additional breakpoints (for targeting only specific screen sizes):
   * - tablet-only
   * - desktop-only
   * - widescreen-only
   */
  gap?: string;
  multiline?: boolean;
  hcentered?: boolean;
  vcentered?: boolean;
}>();
</script>

<template>
  <div class="columns" :class="[
    gap,
    {
      'is-mobile': mobile,
      'is-desktop': desktop,
      'is-gapless': gapless,
      'is-variable': gap,
      'is-vcentered': vcentered,
      'is-multiline': multiline,
      'is-centered': hcentered,
    }
  ]">
    <slot />
  </div>
</template>
