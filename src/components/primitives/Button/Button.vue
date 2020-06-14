<template>
  <button
    class="button"
    :type="nativeType"
    v-bind="$attrs"
    :class="[size, type, {
      'is-rounded': rounded,
      'is-loading': loading,
      'is-outlined': outlined,
      'is-fullwidth': expanded,
      'is-inverted': inverted,
      'is-focused': focused,
      'is-active': active,
      'is-hovered': hovered,
      'is-selected': selected
    }]">
    <span v-if="label">{{ label }}</span>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import config from '../../../utils/config'

export default defineComponent({
    name: 'Button',
    props: {
        type: {
            type: String,
            default: 'button'
        },
        size: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: '',
        },
        iconPack: {
            type: String,
            default: '',
        },
        iconLeft: {
            type: String,
            default: '',
        },
        iconRight: {
            type: String,
            default: '',
        },
        rounded: {
            type: Boolean,
            default() {
                return config.defaultButtonRounded
            }
        },
        loading: Boolean,
        outlined: Boolean,
        expanded: Boolean,
        inverted: Boolean,
        focused: Boolean,
        active: Boolean,
        hovered: Boolean,
        selected: Boolean,
        nativeType: {
            type: String,
            default: 'button',
            validator(value: string) {
                return [
                    'button',
                    'submit',
                    'reset'
                ].includes(value)
            }
        },
        tag: {
            type: String,
            default: 'button',
            validator(value: string) {
                return config.defaultLinkTags.includes(value)
            }
        }
    },
    setup(props, { attrs }) {
        const computedTag = computed(() => {
            return "button"
        })

        return { computedTag };
    }
})
</script>
