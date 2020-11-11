<script>
import { computed, inject } from 'vue'
import { DropdownSymbol } from './Dropdown.vue'

export default {
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
      default: true,
    },
    paddingless: Boolean,
    hasLink: Boolean,
    ariaRole: String,
  },
  setup(props, context) {
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
    const tabIndex = computed(() => {
      return isFocusable.value ? 0 : null
    })
    const dropdownLink = computed(() => {
      return !props.custom && !props.hasLink
    })
    const { selectItem: reportParent } = inject(DropdownSymbol)

    const selectItem = () => {
      if (!isClickable.value) return
      reportParent(props.value)
    }

    const itemIsBlock = computed(() => !props.hasLink)

    return {
      ariaRoleItem,
      isClickable,
      isActive,
      isFocusable,
      selectItem,
      tabIndex,
      dropdownLink,
      itemIsBlock
    }
  },
}
</script>

<template>
  <hr v-if="separator" class="dropdown-divider" />
  <a
    v-else-if="dropdownLink"
    class="dropdown-item"
    :class="{
      'is-disabled': disabled,
      'is-paddingless': paddingless,
      'is-active': isActive,
    }"
    @click="selectItem"
    :role="ariaRoleItem"
    :tabindex="tabIndex">
    <slot />
  </a>
  <div
    v-else
    :class="{
      'dropdown-item': itemIsBlock,
      'is-disabled': disabled,
      'is-paddingless': paddingless,
      'is-active': isActive,
      'has-link': hasLink,
    }"
    @click="selectItem"
    :role="ariaRoleItem"
    :tabindex="tabIndex">
    <slot />
  </div>
</template>
