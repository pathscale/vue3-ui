<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from "vue";
import EyeIcon from "./EyeIcon.vue";

const props = defineProps<{
  color?: string;
  size?: string;
  rounded?: boolean;
  loading?: boolean;
  expanded?: boolean;
  passwordReveal?: boolean;
}>();

const value = defineModel();

const slots = useSlots();
const attrs = useAttrs();

const hasLeftIcon = computed(() => Boolean(slots.leftIcon));
const hasRightIcon = computed(
  () => Boolean(slots.rightIcon) || props.passwordReveal,
);

const showPassword = ref(false);

const computedType = computed(() => {
  if (showPassword.value) {
    return "text";
  }
  return attrs.type;
});

const tooglePassword = () => {
  showPassword.value = !showPassword.value;
};
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
        <slot v-if="$slots.rightIcon" name="rightIcon" />
        <div v-else>
          <eye-icon :invisible="showPassword" />
        </div>
      </div>
      <slot v-else name="rightIcon" />
    </span>
  </div>
</template>
