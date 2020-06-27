<script>
    import { ref, watchEffect, computed } from 'vue'

    const Input = {
        name: 'VInput',
        inheritAttrs: false,
        emits: ['update:modelValue'],
        props: {
            color: { type: String, default: '' },
            size: { type: String, default: '' },
            rounded: { type: Boolean, default: false },
            loading: { type: Boolean, default: false },
        },
        setup(props, { emit, attrs }) {
            const value = ref(attrs.modelValue)
            watchEffect(() => emit('update:modelValue', value.value))

            const rootClasses = computed(() => {
                return [
                    props.size,
                    {
                        'is-loading': props.loading,
                    }
                ]
            });

            const inputClasses = computed(() => {
                return [
                    props.color,
                    props.statusType,
                    props.size,
                    {
                        'is-rounded': props.rounded,
                        'is-expanded': props.expanded
                    }
                ]
            })
            return { value, rootClasses, inputClasses }
        },
    }

    export default Input;
</script>

<template>
  <div
    class="control"
    :class="rootClasses">
    <input class="input" v-bind="$attrs" v-model="value" :class="inputClasses" />
  </div>
</template>
