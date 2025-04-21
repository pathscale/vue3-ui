<script setup lang="ts">
// todo add docs about this component to https://vue3.dev/documentation

const props = defineProps<{
  card?: boolean;
}>();

const active = defineModel({ default: true });

const close = () => {
  active.value = false;
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
