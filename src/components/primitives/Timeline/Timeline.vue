<script setup lang="ts" generic="T extends TimelineStage">
type TimelineStage = {
  active?: boolean;
  error?: boolean;
  /** Stage custom props */
  // biome-ignore lint/suspicious/noExplicitAny: allows custom stage fields
  [key: string]: any;
};

defineProps<{
  /** List of stages */
  stages: Array<T>; // required
}>();
</script>

<template>
  <ol class="timeline">
    <li
      v-for="(stage, index) in stages"
      :key="index"
      :class="{
        'has-text-success is-active': stage.active,
        'has-text-grey': !stage.active,
        'has-text-danger': stage.error,
      }">
      <div>
        <slot :stage="stage" />
      </div>
    </li>
  </ol>
</template>
