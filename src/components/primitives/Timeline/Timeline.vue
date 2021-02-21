<script>
export default {
  name: 'Timeline',
  props: { 
      stages: { type: Object, required: true }
    }
}
</script>

<template>
  <ol class="px-5 timeline">
    <li
      v-for="(stage, index) in stages"
      :key="index"
      :class="{
        'has-text-success is-active': stage.active,
        'has-text-grey': !stage.active,
        'has-text-danger': stage.error,
      }">
      <div class="py-3">
        <slot :stage="stage" />
      </div>
    </li>
  </ol>
</template>

<style scoped>
ol {
  list-style-type: none;
}

.timeline > li {
  position: relative;
  margin: 0;
  padding-bottom: 1em;
  padding-left: 20px;
}

.timeline > li::before {
  content: '';
  background-color: gray;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 6px;
  width: 1px;
}

.timeline > li::after {
  content: '';
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' viewBox='0 0 32 32' focusable='false'%3E%3Ccircle stroke='none' fill='black' cx='16' cy='16' r='10'%3E%3C/circle%3E%3C/svg%3E");
  filter: invert(78%) sepia(15%) saturate(0%) hue-rotate(198deg) brightness(104%) contrast(74%);
  position: absolute;
  left: -6px;
  top: 11px;
  height: 25px;
  width: 25px;
}

.is-active::after {
  filter: invert(70%) sepia(55%) saturate(462%) hue-rotate(86deg) brightness(86%) contrast(91%) !important;
}
</style>
