<template>
  <component :is="variant" :class="`${state.styles} font-sans font-normal`">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { propsToStyles } from '../../utils';

export default defineComponent({
  name: "Typography",
  props: {
    variant: {
      type: String,
      require: true,
      default: "p",
      validator(value: string) {
        return ["p", "h1", "h2", "h3", "h4", "h5", "h6"].includes(value);
      }
    },
    color: {
      type: String,
      default: "dark",
    },
  },
  setup(props: any, context: any) {
    const state = reactive({
      styles: computed(() => propsToStyles({
        props,
        transform: {
          variant: {
            h1: "text-6xl",
            h2: "text-5xl",
            h3: "text-4xl",
            h4: "text-3xl",
            h5: "text-2xl",
            h6: "text-xl",
          },
          color: {
            light: "text-white",
            dark: "text-black"
          }
        },
      })),
    });
    return { state };
  },
});
</script>
