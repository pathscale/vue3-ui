<!-- eslint-disable vue/no-unused-properties -->
<script>
import { h, onMounted, ref, watch } from 'vue'
import { Chart } from '@pathscale/frappe-charts'

export default {
  name: 'VChart',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: null,
    },
    width: {
      type: Number,
      required: false,
      default: null,
    },
    isNavigable: {
      type: Number,
      required: false,
      default: 0,
    },
    xUnit: {
      type: Number,
      required: false,
      default: 1,
    },
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    colors: {
      type: Array,
      default: () => [],
    },
    animate: {
      type: Boolean,
      default: false,
    },
    truncateLegends: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs }) {
    const chartRef = ref(null)
    const chartJSState = {
      chart: null,
      props: {
        ...props,
      },
    }

    const render = () => {
      chartJSState.chart = new Chart(chartRef.value, {
        ...props,
        ...attrs,
      })
    }

    watch(
      () => [props.width],
      () => {
        chartJSState.chart?.update({
          ...props.data,
        })
      },
      {
        flush: 'post',
      },
    )

    onMounted(() => render())

    return () =>
      h('div', {
        ref: chartRef,
      })
  },
}
</script>
