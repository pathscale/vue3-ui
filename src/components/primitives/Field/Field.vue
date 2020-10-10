<script>
import { computed } from 'vue'

export default {
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
    const hasHorizontalLabel = computed(() => props.horizontal && props.label)
    return { rootClasses, hasHorizontalLabel }
  }
}
</script>

<template>
  <div class="field" :class="rootClasses">
    <div v-if="hasHorizontalLabel" class="field-label" :class="size">
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
