<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    multiple?: boolean;
    nativeSize?: string | number;
    size?: "is-small" | "is-normal" | "is-medium" | "is-large";
    expanded?: boolean;
    loading?: boolean;
    rounded?: boolean;
    color?: string;
  }>(),
  {
    nativeSize: null, // TODO: Update docs — documented default for `nativeSize` is 4, but actual default here is null
  },
);

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const value = defineModel({ default: null });

const valueIsNullish = computed(() => value.value === null);

const empty = computed(() => value.value === null);
</script>

<template>
  <div
    class="control"
    :class="{ 'is-expanded': expanded }">
    <span class="select" :class="[size, color, {
      'is-fullwidth': expanded,
      'is-loading': loading,
      'is-multiple': multiple,
      'is-rounded': rounded,
      'is-empty': empty,
    }]">
      <select
        v-model="value"
        ref="select"
        :multiple="multiple"
        :size="nativeSize"
        v-bind="$attrs"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)">
        <template v-if="placeholder">
          <option
            class="has-background-dark has-text-light"
            v-if="valueIsNullish"
            :value="null"
            disabled
            hidden>
            {{ placeholder }}
          </option>
        </template>
        <slot />
      </select>
    </span>
  </div>
</template>
