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
import { defineComponent } from 'vue'

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
            default: false,
        },
        loading: {
          type: Boolean,
          default: false,
        },
        outlined: {
          type: Boolean,
          default: false,
        },
        expanded: {
          type: Boolean,
          default: false,
        },
        inverted: {
          type: Boolean,
          default: false,
        },
        focused: {
          type: Boolean,
          default: false,
        },
        active: {
          type: Boolean,
          default: false,
        },
        hovered: {
          type: Boolean,
          default: false,
        },
        selected: {
          type: Boolean,
          default: false,
        },
        nativeType: {
          type: String,
          default: 'button',
          validator(value) {
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
            validator(value) {
                return [
                  'a',
                  'button',
                  'input',
                  'router-link',
                  'nuxt-link',
                  'n-link',
                  'RouterLink',
                  'NuxtLink',
                  'NLink'
              ].includes(value)
            }
        }
    }
})
</script>