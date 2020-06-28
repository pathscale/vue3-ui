<script>
    import { computed } from 'vue';

    const Column = {
        name: 'VColumn',
        props: {
            size: { type: String, default: '' },
            offset: { type: String, default: '' },
            narrow: { type: Boolean, default: false },
        },
        setup(props) {
            const computedClasses = computed(() => [
                props.size,
                props.offset,
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