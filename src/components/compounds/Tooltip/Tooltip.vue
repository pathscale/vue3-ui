<script>
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
};

export default Tooltip;
</script>

<template>
  <span
    :data-label="label"
    :class="[type, position, size, {
      'v-tooltip': active,
      'is-square': square,
      'is-animated': animated,
      'is-always': always,
      'is-multiline': multilined,
      'is-dashed': dashed
    }]"
    :style="{'transition-delay': `${delay}ms`}">
    <slot />
  </span>
</template>
