<script>
    import { computed } from 'vue';

    const Columns = {
        name: 'VColumns',
        props: {
            mobile: { type: Boolean, default: false },
            desktop: { type: Boolean, default: false },
            gapless: { type: Boolean, default: false },
            variable: { type: Boolean, default: false },
            size: { type: String , default: '' },
            multiline: { type: Boolean, default: false },
            hcentered: { type: Boolean, default: false },
            vcentered: { type: Boolean, default: false },
        },
        setup(props) {
            const computedClasses = computed(() => [
                props.size,
                {
                    'is-mobile': props.mobile,
                    'is-desktop': props.desktop,
                    'is-gapless': props.gapless,
                    'is-variable': props.variable,
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