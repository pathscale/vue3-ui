<script>
  import { computed } from 'vue';

  const Column = {
    name: 'VColumn',
    props: {
      size:  String ,
      offset:  String ,
      narrow:  Boolean,
      narrowBreakpoint: String
    },
    setup(props) {
      const computedClasses = computed(() => [
        props.size,
        props.offset,
        props.narrowBreakpoint,
        {
          'is-narrow': props.narrow
        }
      ]);

      return { computedClasses };
    }
  };

  export default Column;
</script>

<template>
  <div class="column" :class="computedClasses">
    <slot />
  </div>
</template>
