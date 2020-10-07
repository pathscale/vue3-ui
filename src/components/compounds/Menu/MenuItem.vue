<script>
import { ref, computed, watchEffect } from 'vue'

const Component = {
  name: 'VMenuItem',
  inheritAttrs: false,
  props: {
    label: String,
    active: Boolean,
    expanded: Boolean,
    disabled: Boolean,
    icon: String,
    tag: {
      type: String,
      default: 'a'
    },
    ariaRole: String
  },
  setup(props, { emit }) {
    const newActive = ref(props.active)
    const newExpanded = ref(props.expanded)
    const content = ref(null)

    watchEffect(() => {
      newActive.value = props.active
    })
    watchEffect(() => {
      newExpanded.value = props.expanded
    })

    function onClick() {
      // TODO Disable previous active item
      if (props.disabled) return
      newExpanded.value = !newExpanded.value
      emit('update:expanded', newActive.value)
      // newActive.value = true
      emit('update:active', newActive.value )
    }
    const itemClasses = computed(() => {
      return {
        'is-flex': props.icon,
        'is-active': newActive.value,
        'is-disabled': props.disabled
      }
    })

    return { newActive, newExpanded, onClick, content, itemClasses }
  }
}

export default Component
</script>

<template>
  <li :role="ariaRole" ref="content">
    <component
      :is="tag"
      v-bind="$attrs"
      :class="itemClasses"
      @click="onClick($event)">
      <span v-if="icon" class="pr-2">{{ icon }} </span>
      <span v-if="label">
        {{ label }}</span>
      <slot
        v-else
        name="label"
        :expanded="newExpanded"
        :active="newActive" />
    </component>
    <template v-if="$slots.default">
      <transition name="slide">
        <ul v-show="newExpanded">
          <slot />
        </ul>
      </transition>
    </template>
  </li>
</template>
