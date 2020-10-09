<script>
import { computed } from 'vue'

const Tooltip = {
  name: 'VTooltip',
  props: {
    active: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'is-primary'
    },
    label: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'is-top'
    },
    always: Boolean,
    animated: Boolean,
    square: Boolean,
    dashed: Boolean,
    multilined: Boolean,
    size: {
      type: String,
      default: 'is-medium'
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const rootClasses = computed(() => {
      return [
        props.type,
        props.position,
        props.size,
        {
          'v-tooltip': props.active,
          'is-square': props.square,
          'is-animated': props.animated,
          'is-always': props.always,
          'is-multiline': props.multilined,
          'is-dashed': props.dashed
        }
      ]
    })

    const transition = computed(() => {
      return {
        'transition-delay': `${props.delay}ms`
      }
    })
    return { rootClasses, transition }
  }
}

export default Tooltip
</script>

<template>
  <span
    :data-label="label"
    :class="rootClasses"
    :style="transition">
    <slot />
  </span>
</template>
