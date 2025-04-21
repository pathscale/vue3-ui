<script setup lang="ts">
import { computed, ref } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  color?:
    | "is-white"
    | "is-light"
    | "is-dark"
    | "is-black"
    | "is-text"
    | "is-primary"
    | "is-link"
    | "is-info"
    | "is-success"
    | "is-warning"
    | "is-danger";
  hasCounter?: boolean;
  loading?: boolean;
  maxlength?: number | string;
  size?: "is-small" | "is-normal" | "is-medium" | "is-large";
  hovered?: boolean;
  focused?: boolean;
}>();

const value = defineModel();

const isFocused = ref(false);

const onFocus = () => {
  isFocused.value = true;
};

const onBlur = () => {
  isFocused.value = false;
};

const valueLength = computed(() => value.value.length);

const showCounter = computed(() => props.maxlength && props.hasCounter);
</script>

<template>
  <div
    class="control"
    :class="[ size, { 'is-loading': loading } ]">
    <textarea
      ref="textarea"
      class="textarea"
      v-model="value"
      :class="[
        size,
        color,
        {
          'is-hovered': hovered,
          'is-focused': focused,
        }]"
      :maxlength="maxlength"
      v-bind="$attrs"
      @blur="onBlur"
      @focus="onFocus" />
    <small
      v-if="showCounter"
      :class="{ 'is-invisible': !isFocused }">
      {{ valueLength }} / {{ maxlength }}
    </small>
  </div>
</template>
