<script>
import { ref, watchEffect, computed } from 'vue'

const Component = {
    name: 'VMenuItem',
    inheritAttrs: false,
    props: {
        label: String,
        active: Boolean,
        expanded: Boolean,
        disabled: Boolean,
        iconPack: String,
        icon: String,
        animation: {
            type: String,
            default: 'slide'
        },
        tag: {
            type: String,
            default: 'a'
        },
        ariaRole: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const newActive = ref(props.active)
        const newExpanded = ref(props.expanded)
        const content = ref(null)

        const ariaRoleMenu = computed(() => {
            return props.ariaRole === 'menuitem' ? props.ariaRole : null
        })
        
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
        return { newActive, newExpanded, ariaRoleMenu, onClick, content }
    }
}
export default Component
</script>

<template>
  <li :role="ariaRole" ref="content">
    <component
      :is="tag"
      v-bind="$attrs"
      :class="{
        'is-flex': icon,
        'is-active': newActive,
        'is-disabled': newExpanded
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
    <!-- sub menu items -->
    <template v-if="$slots.default">
      <transition :name="animation">
        <ul v-show="newExpanded">
          <slot />
        </ul>
      </transition>
    </template>
  </li>
</template>
