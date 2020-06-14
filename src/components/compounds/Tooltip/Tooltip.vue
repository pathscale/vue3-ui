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

<script>
import { defineComponent, computed } from 'vue'
import config from '../../../utils/config'


export default defineComponent({
    name: 'BTooltip',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: null
        },
        label: {
            type: String,
            required: true
        },
        position: {
            type: String,
            default: 'is-top',
            validator(value) {
                return [
                    'is-top',
                    'is-bottom',
                    'is-left',
                    'is-right'
                ].includes(value)
            }
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
            default: null
        }
    },

    setup(props) {
        const newType = computed(() => {
            return props.type || config.defaultTooltipType
        })
        const newAnimated = computed(() => {
            return props.animated || config.defaultTooltipAnimated
        })
        const newDelay = computed(() => {
            return props.delay || config.defaultTooltipDelay
        })

        return { newType, newAnimated, newDelay}
    }
})
</script>
