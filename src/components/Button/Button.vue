<template>
  <button v-bind="$attrs" :class="`${state.styles} py-2 px-6 uppercase transition ease-in-out duration-300`">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { propsToStyles } from '../../utils';

export default defineComponent({
  name: "Button",
  props: {
    color: {
      type: String,
      required: true,
      default: "wine",
      validator(value:string) {
        return ["wine", "dark", "light"].includes(value);
      }
    },
  },
  setup(props: any, context: any) {
    const state = reactive({
      styles: computed(() => propsToStyles({
        props,
        transform: {
          color: {
            wine: "bg-wine hover:bg-wine-lighter text-white",
            dark: "bg-grey hover:bg-grey-lighter text-white",
            light: "bg-white hover:bg-gray-300 text-black",
          },
        },
      })),
    });
    return { state };
  }
});
</script>
