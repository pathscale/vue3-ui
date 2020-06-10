<template>
  <div
    :class="`${state.styles} max-w-sm rounded overflow-hidden shadow-lg bg-opacity-90`">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { propsToStyles } from '../../utils';

export default defineComponent({
  name: "Card",
  props: {
    color: {
      type: String,
      default: "light",
      validator(value:string) {
        return ["light", "dark"].includes(value);
      }
    },
  },
  setup(props: any, context: any) {
    const state = reactive({
      styles: computed(() => propsToStyles({
        props,
        transform: {
          color: {
            light: "bg-white",
            dark: "bg-grey-darker",
          },
        },
      })),
    });
    return { state };
  }
});
</script>
