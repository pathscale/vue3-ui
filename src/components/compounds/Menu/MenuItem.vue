<script setup lang="ts">
import { ref, watchEffect } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    label?: string;
    expanded?: boolean;
    disabled?: boolean;
    icon?: string;
    tag?: string;
    ariaRole?: string;
  }>(),
  {
    tag: "a",
    ariaRole: "menuitem",
  },
);

const emit = defineEmits(["update:expanded"]);

const newActive = defineModel<boolean>("active");
const newExpanded = ref(props.expanded);
const content = ref(null);

watchEffect(() => {
  newExpanded.value = props.expanded;
});

const onClick = (e: Event) => {
  // TODO Disable previous active item
  if (props.disabled) return;

  newExpanded.value = !newExpanded.value;
  emit("update:expanded", newExpanded.value);

  // newActive.value = true
};
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
