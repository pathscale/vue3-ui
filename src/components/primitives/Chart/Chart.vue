<script lang="ts">
// @ts-ignore
import { Chart } from "@pathscale/frappe-charts";
import { h, onMounted, ref, watch } from "vue";

interface IProps {
	title: string;
	type: string;
	height?: number | null;
	width?: number | null;
	isNavigable?: number;
	xUnit?: number;
	data: Record<string, unknown>;
	options?: Record<string, unknown>;
	colors?: string[];
	animate?: boolean;
	truncateLegends?: boolean;
}

export default {
	name: "VChart",
	inheritAttrs: false,
	props: {
		title: { type: String, required: true },
		type: { type: String, required: true },
		height: { type: Number, default: null },
		width: { type: Number, default: null },
		isNavigable: { type: Number, default: 0 },
		xUnit: { type: Number, default: 1 },
		data: { type: Object as () => Record<string, unknown>, required: true },
		options: {
			type: Object as () => Record<string, unknown>,
			default: () => ({}),
		},
		colors: { type: Array as () => string[], default: () => [] },
		animate: { type: Boolean, default: false },
		truncateLegends: { type: Boolean, default: false },
	},
	setup(props: IProps, { attrs }: { attrs: Record<string, unknown> }) {
		const chartRef = ref(null);
		const chartJSState: {
			chart: Record<string, unknown> | null;
			props: IProps;
		} = {
			chart: null,
			props: {
				...props,
			},
		};

		const render = () => {
			chartJSState.chart = new Chart(chartRef.value, {
				...props,
				...attrs,
			});
		};

		watch(
			() => [props.width],
			() => {
				// @ts-ignore
				chartJSState.chart?.update({
					...props.data,
				});
			},
			{
				flush: "post",
			},
		);

		onMounted(() => render());

		return () =>
			h("div", {
				ref: chartRef,
			});
	},
};
</script>
