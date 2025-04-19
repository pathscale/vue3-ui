<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  modelValue?: string;
  color?: string;
  hasCounter?: boolean;
  loading?: boolean;
  maxlength?: string; // todo | number
  size?: string; // todo union
  hovered?: boolean;
  focused?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);
const isFocused = ref(false);
const onFocus = () => {
  isFocused.value = true;
};
const onBlur = () => {
  isFocused.value = false;
};
const valueLength = computed(() => value.value.length);
const showCounter = computed(() => props.maxlength && props.hasCounter);
watchEffect(() => emit("update:modelValue", value.value));
watchEffect(() => {
  value.value = props.modelValue;
});
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
