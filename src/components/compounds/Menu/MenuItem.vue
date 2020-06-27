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
    setup(props) {
        const newActive = ref(props.active)
        const newExpanded = ref(props.expanded)

        const ariaRoleMenu = computed(() => {
            return props.ariaRole === 'menuitem' ? props.ariaRole : null
        })
        
        watchEffect(() => {
            newActive.value = props.active
        })
        watchEffect(() => {
            newExpanded.value = props.expanded
        })
        return { newActive, newExpanded, ariaRoleMenu}
    }
}
export default Component
</script>

<template>
  <li :role="ariaRole">
    <component
      :is="tag"
      v-bind="$attrs"
      :class="{
        'is-active': active,
        'is-disabled': disabled
      }">
      <span>{{ label }}</span>
      <slot
        name="label"
        :expanded="expanded"
        :active="active" />
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
