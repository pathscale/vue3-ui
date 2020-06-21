<script>
import { ref, onMounted } from 'vue'

const Modal = {
    name: 'VModal',
    props: {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: null,
        },
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const show = ref(props.modelValue)
      onMounted(() => {
            emit('update:modelValue', show)
      })
         return { show }
    },
};

export default Modal;
</script>

<template>
  <!-- // portal is not working -->
  <div :target="`${id}`" class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="show = false">
          <span>×</span>
        </button>
        <h4 class="modal-title" v-if="title">
          {{ title }}
        </h4>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer" />
    </div>
  </div>
</template>
