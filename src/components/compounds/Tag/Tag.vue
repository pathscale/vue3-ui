<template>
  <div v-if="attached && closable" class="tags has-addons">
    <span
      class="tag"
      :class="[type, size, { 'is-rounded': rounded }]">
      <span :class="{ 'has-ellipsis': ellipsis }">
        <slot />
      </span>
    </span>
    <a
      class="tag"
      role="button"
      :aria-label="ariaCloseLabel"
      :tabindex="tabstop ? 0 : false"
      :disabled="disabled"
      :class="[size,
               closeType,
               {'is-rounded': rounded},
               closeIcon ? 'has-delete-icon' : 'is-delete']"
      @click="close"
      @keyup.delete.prevent="close">
      <b-icon
        custom-class=""
        v-if="closeIcon"
        :icon="closeIcon"
        :size="size"
        :type="closeIconType"
        :pack="closeIconPack" />
      <a />
    </a>
  </div>
  <span
    v-else
    class="tag"
    :class="[type, size, { 'is-rounded': rounded }]">
    <span :class="{ 'has-ellipsis': ellipsis }">
      <slot />
    </span>

    <a
      v-if="closable"
      role="button"
      :aria-label="ariaCloseLabel"
      class="delete is-small"
      :class="closeType"
      :disabled="disabled"
      :tabindex="tabstop ? 0 : false"
      @click="close"
      @keyup.delete.prevent="close" />
  </span>
</template>

<script>
/* eslint no-shadow: ["error", { "allow": ["event"] }] -- prevent warning  'event' is already declared in the upper scope */
import { defineComponent } from "vue";

export default defineComponent({
  name: "VTag",
  props: {
    attached: Boolean,
    closable: Boolean,
    type: { type: String, default: null },
    size: { type: String, default: null },
    rounded: Boolean,
    disabled: Boolean,
    ellipsis: Boolean,
    tabstop: {
      type: Boolean,
      default: true
    },
    ariaCloseLabel: { type: String, default: null },
    closeType: { type: String, default: null },
    closeIcon: { type: String, default: null },
    closeIconPack: { type: String, default: null },
    closeIconType: { type: String, default: null }
  },
  setup(props, { emit }) {
    const close = function (event) {
      if (props.disabled) return
      emit('close', event)
    }
    return { close }
  }
});
</script>

<style scoped>
</style>