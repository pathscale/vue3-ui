<script setup lang="ts">
//
</script>

<template>
  <article class="media">
    <div class="media-left">
      <slot name="left" />
    </div>
    <div class="media-content">
      <slot name="content" />
    </div>
    <div class="media-right">
      <slot name="right" />
    </div>
  </article>
</template>
