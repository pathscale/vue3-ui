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
    const hasHorizontalLabel = computed(() => props.horizontal && props.label)
    return { hasHorizontalLabel }
  }
}
</script>

<template>
  <div class="field" :class="[
    position, {
      'is-expanded': expanded,
      'is-horizontal': horizontal,
      'is-grouped': grouped,
      'is-grouped-multiline': groupMultiline,
      'has-addons': addons
    }]">
    <div v-if="hasHorizontalLabel" class="field-label" :class="size">
      <label class="label" :for="labelFor">{{ label }}</label>
    </div>
    <label v-else-if="label" class="label" :for="labelFor">{{ label }}</label>
    <div v-if="horizontal" class="field-body">
      <div class="field" :class="{'is-grouped': grouped}">
        <slot :rounded="type" />
      </div>
    </div>
    <slot :color="type" v-else />
    <p v-if="message" class="help" :class="type">
      {{ message }}
    </p>
  </div>
</template>
