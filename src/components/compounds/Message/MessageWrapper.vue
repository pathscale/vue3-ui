<script>
const Message = {
  name: "VMessageWrapper",
  props: {
    content: {
      type: String,
      default: null
    },
    author: {
      type: String,
      default: null
    },
    timestamp: {
      type: String,
      default: null
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
}
export default Message
</script>

<template>
  <div class="message-wrapper">
    <slot />
  </div>
</template>

