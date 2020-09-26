<script>
  import { ref, watchEffect, computed } from 'vue'

  const Textarea = {
    name: 'VTextarea',
    inheritAttrs: false,
    emits:['update:modelValue'],
    props: {
      color: { type: String, default: '' },
      hasCounter: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
      maxlength: { type: String, default: '' },
      modelValue: { type: String, default: '' },
      size: { type: String, default: '' },
      hovered: { type: Boolean,vdefault: false },
      focused: { type: Boolean,vdefault: false },
    },
    setup(props, { emit }) {
      const value = ref(props.modelValue);
      const isFocused = ref(false);
      const onFocus = () => { isFocused.value = true };
      const onBlur = () => { isFocused.value = false };
      const valueLength = computed(() => value.value.length);
      const rootClasses = computed(() => {
        return [
          props.size,
          {
            'is-loading': props.loading
          }
        ]
      });
      const inputClasses = computed(() => {
        return [
          props.size, 
          props.color, 
          {
          'is-hovered': props.hovered,
          'is-focused': props.focused,
        }]
      });

      watchEffect(() => emit('update:modelValue', value.value));
      return { value, isFocused, onBlur, onFocus, valueLength, rootClasses, inputClasses };
    },
  }

  export default Textarea;
</script>

<template>
  <div
    class="control"
    :class="rootClasses">
    <textarea
      ref="textarea"
      class="textarea"
      v-model="value"
      :class="inputClasses"
      :maxlength="maxlength"
      v-bind="$attrs"
      @blur="onBlur"
      @focus="onFocus" />
    <small
      v-if="maxlength && hasCounter"
      :class="{ 'is-invisible': !isFocused }">
      {{ valueLength }} / {{ maxlength }}
    </small>
  </div>
</template>
