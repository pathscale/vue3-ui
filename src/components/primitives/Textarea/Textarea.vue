<script>
import { computed, ref, watchEffect } from "vue";

export default {
  name: "VTextarea",
  inheritAttrs: false,
  props: {
    color: String,
    hasCounter: Boolean,
    loading: Boolean,
    maxlength: String,
    modelValue: String,
    size: String,
    hovered: Boolean,
    focused: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
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
    return { value, isFocused, onBlur, onFocus, valueLength, showCounter };
  },
};
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
