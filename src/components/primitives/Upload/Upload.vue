<script setup lang="ts">
import { computed, ref, useSlots, watchEffect } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  modelValue?: File | File[];
  multiple?: boolean;
  disabled?: boolean;
  accept?: string;
  dragDrop?: boolean;
  type?:
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
  size?: "is-small" | "is-normal" | "is-medium" | "is-large";
  centered?: boolean;
  right?: boolean;
  expanded?: boolean;
  boxed?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

watchEffect(() => {
  value.value = props.modelValue;
});

watchEffect(() => {
  emit("update:modelValue", value.value);
});

function onChange(e) {
  const { files } = e.target;
  value.value = props.multiple ? [...files] : files[0];
}

function dragover(e) {
  props.dragDrop && e.preventDefault();
}

function dragleave(e) {
  //
}

function drop(e) {
  if (props.dragDrop) {
    e.preventDefault();
    value.value = props.multiple
      ? [...e.dataTransfer.files]
      : e.dataTransfer.files[0];
  }
}

const slots = useSlots();

const hasName = computed(() => Boolean(slots.name));
</script>

<template>
  <div
    class="file"
    :class="[
      type,
      size,
      {
        'is-centered': centered,
        'has-name': hasName,
        'is-right': right,
        'is-fullwidth': expanded,
        'is-boxed': boxed,
      },
    ]">
    <label class="file-label" @dragover="dragover" @dragleave="dragleave" @drop="drop">
      <input
        class="file-input"
        type="file"
        name="resume"
        v-bind="$attrs"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="onChange" />
      <span class="file-cta">
        <span class="file-icon">
          <slot name="icon" />
        </span>
        <span class="file-label"> <slot name="label" /> </span>
      </span>
      <span v-if="hasName" class="file-name">
        <slot name="name" />
      </span>
    </label>
  </div>
</template>



