<script>
const Message = {
  name: "VMessage",
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
    },
    alignment: {
      type: String,
      default: "msg-left"
    }
  },
}
export default Message
</script>

<template>
  <div :class="[alignment, {
    'is-transparent': transparent
  }]">
    <div>
      <span class="msg-author">{{ author }}</span> 
      <span class="msg-time">{{ timestamp }}</span>
    </div>
    <div class="msg-content">
      {{ content }}
    </div>
  </div>
</template>
