<script>
import { ref, onMounted } from 'vue'

const Modal = {
    name: 'VModal',
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        card: Boolean
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const active = ref(props.modelValue)
      onMounted(() => {
            emit('update:modelValue', active)
      })

      function close() {
        emit('update:modelValue', false)
      }
      return { active, close }
    },
};

export default Modal;
</script>
<template>
  <div class="modal" :class="[{'is-active': active}]">
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
