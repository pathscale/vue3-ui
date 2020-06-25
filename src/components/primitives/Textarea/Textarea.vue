<script>
import { ref, watchEffect, computed } from 'vue'

const Textarea = {
    name: 'VTextarea',
    inheritAttrs: false,
    emits:['update:modelValue'],
    props: {
        value: [Number, String],
        hasCounter: {
            type: Boolean,
        },
        customClass: {
            type: String,
            default: ''
        },
        size: String,
        maxlength: Number,

        expanded: Boolean,
        loading: Boolean,
        rounded: Boolean,
    },
    setup(props, { emit, attrs }) {
        console.log(props)
        console.log(attrs)
        const value = ref(attrs.modelValue)
        watchEffect(() => emit('update:modelValue', value.value))
        
        const valueLength = computed(() => value.value.length)
        const rootClasses = computed(() => {
            return [
                props.size,
                {
                    'is-expanded': props.expanded,
                    'is-loading': props.loading,
                }
            ]
        });

        const inputClasses = computed(() => {
            return [
                props.statusType,
                props.size,
                { 'is-rounded': props.rounded }
            ]
        })


        return { value, rootClasses, inputClasses, valueLength }
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
      :class="[inputClasses, customClass]"
      :maxlength="maxlength"      
      v-bind="$attrs"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus" />
    <small
      v-if="maxlength && hasCounter"
      class="help counter"
      :class="{ 'is-invisible': !isFocused }">
      {{ valueLength }} / {{ maxlength }}
    </small>
  </div>
</template>
