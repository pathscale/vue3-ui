<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  type?: string;
  label?: string;
  labelFor?: string;
  message?: string;
  grouped?: boolean;
  groupMultiline?: boolean;
  position?: string;
  expanded?: boolean;
  horizontal?: boolean;
  addons?: boolean;
  size?: string;
}>();

const hasHorizontalLabel = computed(() => !!(props.horizontal && props.label));
</script>

<template>
  <div class="field" :class="[
    position, {
      'is-expanded': expanded,
      'is-horizontal': horizontal,
      'is-grouped': grouped,
      'is-grouped-multiline': groupMultiline,
      'has-addons': addons
    }]">
    <div v-if="hasHorizontalLabel" class="field-label" :class="size">
      <label class="label" :for="labelFor">{{ label }}</label>
    </div>
    <label v-else-if="label" class="label" :for="labelFor">{{ label }}</label>
    <div v-if="horizontal" class="field-body">
      <div class="field" :class="{'is-grouped': grouped}">
        <slot :rounded="type" />
      </div>
    </div>
    <slot :color="type" v-else />
    <p v-if="message" class="help" :class="type">
      {{ message }}
    </p>
  </div>
</template>
