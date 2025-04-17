<script>
export default {
  name: 'Timeline',
  props: {
    stages: { type: Object, required: true },
  },
}
</script>

<template>
  <ol class="timeline">
    <li
      v-for="(stage, index) in stages"
      :key="index"
      :class="{
        'has-text-success is-active': stage.active,
        'has-text-grey': !stage.active,
        'has-text-danger': stage.error,
      }">
      <div>
        <slot :stage="stage" />
      </div>
    </li>
  </ol>
</template>
