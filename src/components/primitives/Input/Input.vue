<script>
import { ref, watchEffect, computed } from 'vue'
import EyeIcon from './EyeIcon.vue'

export default {
  name: 'VInput',
  components: { EyeIcon },
  inheritAttrs: false,
  props: {
    color: String,
    size: String,
    rounded: Boolean,
    loading: Boolean,
    expanded: Boolean,
    modelValue: [String, Number],
    passwordReveal: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots, attrs }) {
    const hasLeftIcon = computed(() => Boolean(slots.leftIcon))
    const hasRightIcon = computed(() => Boolean(slots.rightIcon) || props.passwordReveal)
    const value = ref(props.modelValue)
    const showPassword = ref(false)

    const computedType = computed(() => {
      if (showPassword.value) {
        return 'text'
      }
      return attrs.type
    })

    const tooglePassword = () => {
      showPassword.value = !showPassword.value
    }

    watchEffect(() => {
      value.value = props.modelValue
    })

    watchEffect(() => emit('update:modelValue', value.value))

    return {
      value,
      hasLeftIcon,
      hasRightIcon,
      tooglePassword,
      computedType,
      rightIcon: slots.rightIcon,
      showPassword,
    }
  },
}
</script>

<template>
  <div
    class="control"
    :class="[
      size,
      {
        'is-loading': loading,
        'has-icons-left': hasLeftIcon,
        'has-icons-right': hasRightIcon,
      },
    ]">
    <input
      class="input"
      v-bind="$attrs"
      v-model="value"
      :type="computedType"
      :class="[
        color,
        size,
        {
          'is-rounded': rounded,
          'is-expanded': expanded,
        },
      ]" />
    <span class="icon is-left" v-if="hasLeftIcon">
      <slot name="leftIcon" />
    </span>
    <span class="icon is-right" v-if="hasRightIcon">
      <div class="is-clickable" v-if="passwordReveal" @click="tooglePassword">
        <slot v-if="rightIcon" name="rightIcon" />
        <div v-else>
          <eye-icon :invisible="showPassword" />
        </div>
      </div>
      <slot v-else name="rightIcon" />
    </span>
  </div>
</template>
