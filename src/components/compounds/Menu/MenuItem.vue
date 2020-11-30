<script>
import { ref, watchEffect } from 'vue'

export default {
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
  emits: ['update:expanded', 'update:active'],
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

    const onClick = () => {

      // TODO Disable previous active item
      if (props.disabled) return

      newExpanded.value = !newExpanded.value
      emit('update:expanded', newExpanded.value)
      emit('update:active', newActive.value )
      // newActive.value = true
    }

    return { newActive, newExpanded, onClick, content }
  }
}
</script>

<template>
  <li class="li" :role="ariaRole" ref="content">
    <component
      :is="tag"
      v-bind="$attrs"
      :class="{
        'is-flex': icon,
        'is-active': newActive,
        'is-disabled': disabled
      }"
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
      <!-- <transition name="slide"> -->
      <ul class="ul" v-show="newExpanded">
        <slot />
      </ul>
      <!-- </transition> -->
    </template>
  </li>
</template>
