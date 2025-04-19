<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    card?: boolean;
  }>(),
  {
    modelValue: true,
  },
);

const emit = defineEmits(["update:modelValue"]);

const active = ref(props.modelValue);

onMounted(() => {
  emit("update:modelValue", active);
});

watchEffect(() => {
  active.value = props.modelValue;
});

const close = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <div class="modal" :class="{ 'is-active': active }">
    <div class="modal-background" @click="close" />
    <template v-if="!card">
      <div class="modal-content">
        <slot />
      </div>
      <button class="modal-close" aria-label="close" @click="close" />
    </template>
    <div v-else class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="title" />
        </p>
        <button class="delete" aria-label="close" @click="close" />
      </header>
      <div class="modal-card-body">
        <slot name="content" />
      </div>
      <footer class="modal-card-foot">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
