<script>
  import { computed } from 'vue';

  const Columns = {
    name: 'VColumns',
    props: {
      mobile: Boolean,
      desktop: Boolean,
      gapless: Boolean,
      gap: String,
      multiline: Boolean,
      hcentered: Boolean,
      vcentered: Boolean,
    },
    setup(props) {
      const computedClasses = computed(() => [
        props.gap,
        {
          'is-mobile': props.mobile,
          'is-desktop': props.desktop,
          'is-gapless': props.gapless,
          'is-variable': props.gap,
          'is-vcentered': props.vcentered,
          'is-multiline': props.multiline,
          'is-centered': props.hcentered,
        }
      ]);

      return { computedClasses };
    }
  };

  export default Columns;
</script>

<template>
  <div class="columns" :class="computedClasses">
    <slot />
  </div>
</template>