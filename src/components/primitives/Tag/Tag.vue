<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    attached?: boolean;
    closable?: boolean;
    type?:
      | "is-white"
      | "is-black"
      | "is-light"
      | "is-dark"
      | "is-primary"
      | "is-info"
      | "is-success"
      | "is-warning"
      | "is-danger";
    size?: "is-normal" | "is-medium" | "is-large";
    rounded?: boolean;
    disabled?: boolean;
    ellipsis?: boolean;
    tabstop?: boolean;
    ariaCloseLabel?: string;
    closeType?:
      | "is-white"
      | "is-black"
      | "is-light"
      | "is-dark"
      | "is-primary"
      | "is-info"
      | "is-success"
      | "is-warning"
      | "is-danger";
    closeIcon?: string;
  }>(),
  {
    tabstop: true,
  },
);

const emit = defineEmits(["close"]);

const close = (event) => {
  if (props.disabled) return;
  emit("close", event);
};

const tabIndex = computed(() => (props.tabstop ? 0 : false));

const isClosable = computed(() => props.attached && props.closable);

const closeButtonInside = computed(
  () => props.closable && !(props.attached && props.closable),
);
</script>

<template>
  <div :class="{'tags has-addons': isClosable}">
    <span
      class="tag"
      :class="[type, size, { 'is-rounded': rounded }]">
      <span :class="{'has-ellipsis': ellipsis}">
        <slot />
      </span>
      <a
        v-if="closeButtonInside"
        role="button"
        :aria-label="ariaCloseLabel"
        class="delete is-small"
        :class="closeType"
        :disabled="disabled"
        :tabindex="tabIndex"
        @click="close"
        @keyup.delete.prevent="close" />
    </span>
    <a
      v-if="isClosable"
      class="tag"
      role="button"
      :aria-label="ariaCloseLabel"
      :tabindex="tabIndex"
      :disabled="disabled"
      :class="[size, closeType, {'is-rounded': rounded, 'has-delete-icon': closeIcon, 'is-delete': !closeIcon}]"
      @click="close"
      @keyup.delete.prevent="close" />
  </div>
</template>
