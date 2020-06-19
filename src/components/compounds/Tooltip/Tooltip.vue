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
        const newType = computed(() => {
            return props.type
        })
        const newAnimated = computed(() => {
            return props.animated
        })
        const newDelay = computed(() => {
            return props.delay
        })

        return { newType, newAnimated, newDelay}
    }
};

export default Tooltip;
</script>

<template>
  <span
    :data-label="label"
    :class="[newType, position, size, {
      'b-tooltip': active,
      'is-square': square,
      'is-animated': newAnimated,
      'is-always': always,
      'is-multiline': multilined,
      'is-dashed': dashed
    }]"
    :style="{'transition-delay': `${newDelay}ms`}">
    <slot />
  </span>
</template>
