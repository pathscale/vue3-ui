<script>
import { computed, nextTick, ref, watchEffect } from "vue";

export default {
	name: "VProgress",
	props: {
		type: {
			type: [String, Object],
			default: "is-darkgrey",
		},
		size: String,
		value: Number,
		max: {
			type: Number,
			default: 100,
		},
		showValue: Boolean,
		format: {
			type: String,
			default: "raw",
		},
		precision: {
			type: Number,
			default: 2,
		},
		keepTrailingZeroes: Boolean,
	},
	setup(props, { slot }) {
		const progress = ref(null);

		const toFixed = (num) => {
			let fixed = Number(
				`${Math.round(Number(`${num}e${props.precision}`))}e${-props.precision}`,
			).toFixed(props.precision);
			if (!props.keepTrailingZeroes) {
				fixed = fixed.replace(/\.?0+$/, "");
			}
			return fixed;
		};

		watchEffect(() =>
			nextTick(() => {
				if (isIndeterminate.value) {
					progress.value.removeAttribute("value");
				} else {
					progress.value.setAttribute("value", props.value);
				}
			}),
		);

		const isIndeterminate = computed(() => {
			return props.value === undefined || props.value === null;
		});

		const beyondHalf = computed(() => props.value >= 50);

		const newValue = computed(() => {
			if (
				props.value === undefined ||
				props.value === null ||
				Number.isNaN(props.value)
			) {
				return undefined;
			}

			if (props.format === "percent") {
				const val = toFixed((props.value * 100) / props.max);
				return `${val}%`;
			}
			const val = toFixed(props.value);
			return val;
		});

		return { beyondHalf, newValue, progress };
	},
};
</script>

<template>
  <div class="progress-wrapper">
    <progress
      ref="progress"
      class="progress"
      :class="[size, type]"
      :max="max"
      :value="value">
      {{ newValue }}
    </progress>
    <p
      v-if="showValue"
      class="progress-value"
      :class="{ 'more-than-half': beyondHalf }">
      <slot>{{ newValue }}</slot>
    </p>
  </div>
</template>
