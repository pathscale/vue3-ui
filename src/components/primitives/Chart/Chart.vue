<script>
import { onMounted } from 'vue'
import { Chart } from 'frappe-charts'

export default {
  name: 'VChart',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: false,
      default: null
    },
    width: {
      type: Number,
      required: false,
      default: null
    },
    isNavigable: {
      type: Number,
      required: false,
      default: 0
    },
    xUnit: {
      type: Number,
      required: false,
      default: 1
    },
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    },
    colors: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const chartJSState = {
      chart: null,
      props: {
        title: props.title,
        type: props.type,
        data: props.data,
        width: props.width,
        height: props.height,
        options: props.options,
        colors: props.colors,
        isNavigable: props.isNavigable,
        xUnit: props.xUnit,
      }
      // props: { ...props }
    }

    const render = () => {
      chartJSState.chart = new Chart(
        "#chartRef", {
          title: chartJSState.props.title,
          type: chartJSState.props.type,
          data: chartJSState.props.data,
          height: chartJSState.props.height,
          colors: chartJSState.props.colors,
          isNavigable: chartJSState.props.isNavigable,
          xUnit: chartJSState.props.xUnit,
          // plugins: chartJSState.plugins
        }
      )
    }

    onMounted(() => render())

    return {}
  },
}
</script>
