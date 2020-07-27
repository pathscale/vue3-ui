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
            hasIconsLeft: { type: Boolean, default: false },
            hasIconsRight: { type: Boolean, default: false },
            leftIcon: { type: String, default: '' },
            rightIcon: { type: String, default: '' }
        },
        setup(props, { emit, attrs }) {
            const value = ref(attrs.modelValue)
            watchEffect(() => emit('update:modelValue', value.value))

            const rootClasses = computed(() => {
                return [
                    props.size,
                    {
                        'is-loading': props.loading,
                        'has-icons-left': props.hasIconsLeft,
                        'has-icons-right': props.hasIconsRight
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
    <span v-if="hasIconsLeft" class="icon is-left">
        <i>{{ leftIcon }}</i>
    </span>
    <span v-if="hasIconsRight" class="icon is-right">
        <i>{{ rightIcon }}</i>
    </span>
  </div>
</template>
