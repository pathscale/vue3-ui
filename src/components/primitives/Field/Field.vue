<script>
import { computed } from "vue"

  const Field = {
    name: 'VField',
    props: {
      type: String,
      label: String,
      labelFor: String,
      message: String,
      grouped: Boolean,
      groupMultiline: Boolean,
      position: String,
      expanded: Boolean,
      horizontal: Boolean,
      addons: Boolean,
      size: String,
    },
    setup(props) {
      const rootClasses = computed(() => {
        return [
          props.position, {
          'is-expanded': props.expanded,
          'is-horizontal': props.horizontal,
          'is-grouped': props.grouped,
          'is-grouped-multiline': props.groupMultiline,
          'has-addons': props.addons
        }]
      })
      return { rootClasses }
    }
  }

  export default Field;
</script>

<template>
  <div class="field" :class="rootClasses">
    <div v-if="horizontal && label" class="field-label" :class="size">
      <label class="label" :for="labelFor">{{ label }}</label>
    </div>
    <label v-else-if="label" class="label" :for="labelFor">{{ label }}</label>
    <div v-if="horizontal" class="field-body">
      <div class="field" :class="{'is-grouped': grouped}">
        <slot />
      </div>
    </div>
    <slot v-else />
    <p v-if="message" class="help" :class="type">
      {{ message }}
    </p>
  </div>
</template>
