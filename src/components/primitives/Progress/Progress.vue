<template>
  <div class="progress-wrapper">
    <progress
      ref="progress"
      class="progress"
      :class="newType"
      :max="max"
      :value="value">
      {{ newValue }}
    </progress>
    <p
      v-if="showValue"
      class="progress-value">
      <slot>{{ newValue }}</slot>
    </p>
  </div>
</template>

<script>
import { defineComponent, computed, watchEffect, nextTick, ref } from 'vue'

export default defineComponent({
    name: 'VProgress',
     props: {
        type: {
            type: [String, Object],
            default: 'is-darkgrey'
        },
        size: {
          type: String,
          default: null
        },
        value: {
            type: Number,
            default: undefined
        },
        max: {
            type: Number,
            default: 100
        },
        showValue: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: 'raw',
            validator(value) {
                return [
                    'raw',
                    'percent'
                ].includes(value)
            }
        },
        precision: {
            type: Number,
            default: 2
        },
        keepTrailingZeroes: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slot }) {
      const progress = ref(null)


      function toFixed(num) {
            let fixed = (Number(`${Math.round(Number(`${num}e${props.precision}`))}e${-props.precision}`)).toFixed(props.precision)
            if (!props.keepTrailingZeroes) {
                fixed = fixed.replace(/\.?0+$/, '')
            }
            return fixed
      }

      watchEffect(() => 
        nextTick(() => {
            if (isIndeterminate.value) {
                // TODO progress.value (ref) is always null
                progress.value.removeAttribute('value')
            } else {
                progress.value.setAttribute('value', props.value)
            }
        })
      )
      
      const isIndeterminate = computed(() => {
            return props.value === undefined || props.value === null
        });
        const newType = computed(() => {
            return [
                props.size,
                props.type
            ]
        });
        const newValue = computed(() => {
            if (props.value === undefined || props.value === null || Number.isNaN(props.value)) {
                return undefined
            }

            if (props.format === 'percent') {
                const val = toFixed(props.value * 100 / props.max)
                return `${val}%`
            }
            const val = toFixed(props.value)
            return val
        });

      return { isIndeterminate, newType, newValue }
    }
})
</script>
