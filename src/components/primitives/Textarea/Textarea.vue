<script>
import { ref } from 'vue'

const Textarea = {
    name: 'VTextarea',
    inheritAttrs: false,

    setup(props, { emit, attrs }) {
        const value = ref(attrs.modelValue)

        return { value }
    },
}

export default Textarea;
</script>

<template>
  <textarea
    ref="textarea"
    class="textarea"
    :class="[inputClasses, customClass]"
    :maxlength="maxlength"
    :value="computedValue"
    v-bind="$attrs"
    @input="onInput"
    @blur="onBlur"
    @focus="onFocus" />
</template>
