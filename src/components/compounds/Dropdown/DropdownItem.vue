<script>
import { computed } from "vue"

const Component = {
  name: 'VDropdownItem',
  props: {
    value: {
			type: [String, Number, Boolean, Object, Array, Function],
    },
    separator: Boolean,
    disabled: Boolean,
    custom: Boolean,
    focusable: {
			type: Boolean,
			default: true
    },
    paddingless: Boolean,
    hasLink: Boolean,
    ariaRole: String
  },
  setup(props, { emit }) {
    const anchorClasses = computed(() => {
      return {
        'is-disabled': props.disabled,
        'is-paddingless': props.paddingless,
        'is-active': isActive.value
      }
    })
    const itemClasses = computed(() => {
      return {
        'dropdown-item': !props.hasLink,
        'is-disabled': props.disabled,
        'is-paddingless': props.paddingless,
        'is-active': isActive.value,
        'has-link': props.hasLink
      }
    })
    const ariaRoleItem = computed(() => {
      return props.ariaRole === 'menuitem' || props.ariaRole === 'listitem' ? props.ariaRole : null
    })
    const isClickable = computed(() => {
      return !props.separator && !props.disabled && !props.custom
    })
    const isActive = computed(() => {
      return false // TODO
    })
    const isFocusable = computed(() => {
      return props.hasLink ? false : props.focusable
    })

    function selectItem() {
      if (!isClickable.value) return
      // this.$parent.selectItem(this.value) TODO
      emit('click')
    }
    return { anchorClasses, itemClasses, ariaRoleItem, isClickable, isActive, isFocusable, selectItem}
  }
}

export default Component
</script>

<template>
  <hr v-if="separator" class="dropdown-divider" />
  <a
    v-else-if="!custom && !hasLink"
    class="dropdown-item"
    :class="anchorClasses"
    @click="selectItem"
    :role="ariaRoleItem"
    :tabindex="isFocusable ? 0 : null">
    <slot />
  </a>
  <div
    v-else
    :class="itemClasses"
    @click="selectItem"
    :role="ariaRoleItem"
    :tabindex="isFocusable ? 0 : null">
    <slot />
  </div>
</template>
